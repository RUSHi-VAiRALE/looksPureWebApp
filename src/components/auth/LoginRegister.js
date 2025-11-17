'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiPhone, FiMail } from 'react-icons/fi'
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export default function LoginRegister({ mode = 'login' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Phone auth states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [otpSent, setOtpSent] = useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)

  // Resend OTP timer states
  const [resendTimer, setResendTimer] = useState(0)
  const [canResend, setCanResend] = useState(false)

  // Registration flow states - only shown if user is new
  const [isNewUser, setIsNewUser] = useState(false)
  const [showDetailsForm, setShowDetailsForm] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  // Initialize reCAPTCHA for Phone Authentication
  useEffect(() => {
    if (!recaptchaVerifier) {
      try {
        // RecaptchaVerifier: auth is first parameter, then container ID, then options
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
            console.log('reCAPTCHA solved')
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again
            setError('reCAPTCHA expired. Please try again.')
          }
        })

        setRecaptchaVerifier(verifier)
        console.log('reCAPTCHA initialized successfully')
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error)
        setError('Failed to initialize reCAPTCHA. Please refresh the page.')
      }
    }

    return () => {
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear()
        } catch (error) {
          console.error('Error clearing reCAPTCHA:', error)
        }
      }
    }
  }, [])

  // Timer countdown for resend OTP
  useEffect(() => {
    let interval = null

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [resendTimer])

  const resetForm = () => {
    setError('')
    setSuccess('')
    setOtpSent(false)
    setConfirmationResult(null)
    setPhoneNumber('')
    setOtp('')
    setShowDetailsForm(false)
    setIsNewUser(false)
    setFirstName('')
    setLastName('')
    setEmail('')
    setResendTimer(0)
    setCanResend(false)
  }

  // Format phone number to E.164 format
  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')

    // If it's a 10-digit number, assume it's Indian and add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`
    }

    // If it already starts with country code
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`
    }

    // If it already has +
    if (phone.startsWith('+')) {
      return phone
    }

    return `+${cleaned}`
  }

  // Send OTP - unified flow (no separate login/register)
  const handleSendOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate phone number
    const cleaned = phoneNumber.replace(/\D/g, '')
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      setLoading(false)
      return
    }

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      if (!recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized. Please refresh the page.')
      }

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'customers', formattedPhone))
      setIsNewUser(!userDoc.exists())

      // Send OTP via Firebase Phone Authentication
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier)
      setConfirmationResult(confirmation)
      setOtpSent(true)

      // Start 60 second timer for resend OTP
      setResendTimer(60)
      setCanResend(false)

      if (userDoc.exists()) {
        setSuccess('OTP sent successfully! Please check your phone to login.')
      } else {
        setSuccess('OTP sent successfully! Please verify to create your account.')
      }

    } catch (error) {
      console.error('Error sending OTP:', error)
      if (error.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format')
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.')
      } else if (error.message && error.message.includes('reCAPTCHA')) {
        setError('reCAPTCHA verification failed. Please try again.')
      } else {
        setError(error.message || 'Failed to send OTP. Please try again.')
      }

      // Reinitialize reCAPTCHA on error
      try {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved')
          },
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.')
          }
        })
        setRecaptchaVerifier(verifier)
      } catch (reinitError) {
        console.error('Error reinitializing reCAPTCHA:', reinitError)
      }
    } finally {
      setLoading(false)
    }
  }

  // Unified OTP Verification - handles both new and existing users
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      setLoading(false)
      return
    }

    try {
      if (!confirmationResult) {
        throw new Error('Please request OTP first')
      }

      // Verify OTP
      const result = await confirmationResult.confirm(otp)
      const user = result.user
      const formattedPhone = formatPhoneNumber(phoneNumber)

      // Check if this is a new user
      if (isNewUser) {
        // New user - show details form to complete profile
        setShowDetailsForm(true)
        setSuccess('Phone verified! Please complete your profile.')
      } else {
        // Existing user - fetch data from Firestore and login
        const userDoc = await getDoc(doc(db, 'customers', formattedPhone))

        if (!userDoc.exists()) {
          // Shouldn't happen but handle it gracefully
          setShowDetailsForm(true)
          setIsNewUser(true)
          setSuccess('Phone verified! Please complete your profile.')
          return
        }

        const userData = userDoc.data()

        // Store user data in localStorage (for backward compatibility)
        localStorage.setItem('userProfile', JSON.stringify({
          customerId: userDoc.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          mobile: userData.mobile,
          displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
          shippingAddress: userData.shippingAddress || null,
          billingAddress: userData.billingAddress || null,
          uid: user.uid,
          phoneNumber: formattedPhone
        }))

        // Redirect to home - user is logged in via Firebase auth
        router.push('/')
      }

    } catch (error) {
      console.error('OTP verification error:', error)
      if (error.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP. Please try again.')
      } else if (error.code === 'auth/code-expired') {
        setError('OTP expired. Please request a new one.')
      } else {
        setError(error.message || 'Failed to verify OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Save user details to Firestore after registration
  const handleSaveUserDetails = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate form
    if (!firstName || !lastName || !email) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('User not authenticated')
      }

      const formattedPhone = formatPhoneNumber(phoneNumber)
      const displayName = `${firstName.trim()} ${lastName.trim()}`
      const email1 = email.trim().toLowerCase()
      // Update Firebase user profile with displayName and email
      await updateProfile(user, {
        displayName: displayName,
        email: email1
      })

      // Save user data to Firestore customers collection
      await setDoc(doc(db, 'customers', formattedPhone), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        mobile: formattedPhone,
        uid: user.uid,
        phoneNumber: formattedPhone,
        displayName: displayName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        shippingAddress: null,
        billingAddress: null
      })

      // Store user data in localStorage
      localStorage.setItem('userProfile', JSON.stringify({
        customerId: formattedPhone,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        mobile: formattedPhone,
        displayName: displayName,
        shippingAddress: null,
        billingAddress: null,
        uid: user.uid,
        phoneNumber: formattedPhone
      }))

      // Redirect to home
      router.push('/')

    } catch (error) {
      console.error('Error saving user details:', error)
      setError(error.message || 'Failed to save user details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      if (!recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized. Please refresh the page.')
      }

      // Resend OTP via Firebase Phone Authentication
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier)
      setConfirmationResult(confirmation)
      setSuccess('OTP resent successfully! Please check your phone.')

      // Restart 60 second timer
      setResendTimer(60)
      setCanResend(false)

    } catch (error) {
      console.error('Error resending OTP:', error)
      if (error.message && error.message.includes('reCAPTCHA')) {
        setError('reCAPTCHA verification failed. Please try again.')
      } else {
        setError('Failed to resend OTP. Please try again.')
      }

      // Reinitialize reCAPTCHA on error
      try {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved')
          },
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.')
          }
        })
        setRecaptchaVerifier(verifier)
      } catch (reinitError) {
        console.error('Error reinitializing reCAPTCHA:', reinitError)
      }
    } finally {
      setLoading(false)
    }
  }

  // Show user details form after OTP verification (Registration)
  if (showDetailsForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <Link href="/" className="flex items-center text-gray-600 mb-6">
              <FiArrowLeft className="mr-2" /> Back to home
            </Link>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Complete Your Profile
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Phone verified: <span className="font-semibold">{phoneNumber}</span>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSaveUserDetails}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <Link href="/" className="flex items-center text-gray-600 mb-6">
            <FiArrowLeft className="mr-2" /> Back to home
          </Link>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Welcome to LooksPure
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your mobile number to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {!otpSent ? (
          // Phone Number Form
          <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                We&apos;ll send you an OTP to verify your number
              </p>
            </div>

            <div id="recaptcha-container"></div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </form>
        ) : (
          // OTP Verification Form
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false)
                    setOtp('')
                    setConfirmationResult(null)
                  }}
                  className="text-xs text-gray-600 hover:text-gray-800 underline"
                >
                  Change Number
                </button>
              </div>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-center text-2xl tracking-widest"
                placeholder="000000"
              />
              <p className="mt-1 text-xs text-gray-500">
                OTP sent to {phoneNumber}
              </p>
            </div>

            <div className="flex items-center justify-between">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-black hover:text-gray-800 underline disabled:opacity-50 font-medium"
                >
                  Resend OTP
                </button>
              ) : (
                <div className="text-sm text-gray-600">
                  Resend OTP in <span className="font-semibold text-black">{resendTimer}s</span>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}