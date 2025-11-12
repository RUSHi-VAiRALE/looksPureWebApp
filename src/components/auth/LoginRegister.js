'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiEye, FiEyeOff, FiMail } from 'react-icons/fi'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '@/lib/firebase'
const API_BASE_URL = process.env.NEXT_PUBLIC_URL;
export default function LoginRegister({ mode = 'login' }) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [pendingUserData, setPendingUserData] = useState(null)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [unverifiedUser, setUnverifiedUser] = useState(null)

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setVerificationSent(false)
    setPendingUserData(null)
    setShowVerificationPrompt(false)
    setUnverifiedUser(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if email is verified
      if (!user.emailVerified) {
        // Store user info for verification prompt
        setUnverifiedUser({
          email: user.email,
          user: user
        })
        setShowVerificationPrompt(true)
        setError('')
        setLoading(false)
        return
      }

      // Fetch user profile data from API
      try {
        const token = await (user.getIdToken())
        const response = await fetch(`${API_BASE_URL}/api/customers/profile?email=${user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })

        if (response.ok) {
          const profileData = await response.json()

          // Store profile data in localStorage for persistence
          localStorage.setItem('userProfile', JSON.stringify({
            customerId: profileData.customerId,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            mobile: profileData.mobile,
            shippingAddress: profileData.shippingAddress || null,
            billingAddress: profileData.billingAddress || null,
            uid: user.uid
          }))
        } else {
          console.warn('Failed to fetch user profile data, but login successful')
        }
      } catch (profileError) {
        console.error('Error fetching profile:', profileError)
        // Continue with login even if profile fetch fails
      }

      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      setError(getAuthErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate form
    if (!firstName || !lastName || !mobile || !email || !password) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number')
      setLoading(false)
      return
    }

    let firebaseUserCreated = false
    let firebaseUser = null

    try {
      // Create user in Firebase first
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      firebaseUser = userCredential.user
      firebaseUserCreated = true

      // Store pending user data
      setPendingUserData({
        email,
        firstName,
        lastName,
        mobile,
        uid: firebaseUser.uid
      })

      // Send email verification
      await sendEmailVerification(firebaseUser, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      })

      // Sign out the user until they verify their email
      await auth.signOut()

      // Show verification message
      setVerificationSent(true)
      setError('')

    } catch (error) {
      console.error('Registration error:', error)

      // If Firebase account was created but there was an error after that, clean it up
      if (firebaseUserCreated && firebaseUser) {
        try {
          // Delete the Firebase user account if something went wrong
          await firebaseUser.delete()
          console.log('Cleaned up Firebase account due to registration error')
        } catch (deleteError) {
          console.error('Failed to clean up Firebase account:', deleteError)
        }
      }

      setError(getAuthErrorMessage(error.code) || error.message)
    } finally {
      setLoading(false)
    }
  }

  // Function to check verification and create account
  const checkVerificationAndCreateAccount = async () => {
    setLoading(true)
    setError('')

    try {
      // Sign in to check verification status
      const userCredential = await signInWithEmailAndPassword(auth, pendingUserData.email, password)
      const user = userCredential.user

      // Reload user to get latest emailVerified status
      await user.reload()

      if (!user.emailVerified) {
        setError('Email not verified yet. Please check your inbox and click the verification link.')
        await auth.signOut()
        setLoading(false)
        return
      }

      // Email is verified, now create account in backend
      const response = await fetch(`${API_BASE_URL}/api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: pendingUserData.email,
          firstName: pendingUserData.firstName,
          lastName: pendingUserData.lastName,
          mobile: pendingUserData.mobile,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // If email already exists in backend, it might be from a previous registration
        if (errorData.message && errorData.message.toLowerCase().includes('already exists')) {
          // Account already exists in backend, just proceed to login
          await auth.signOut()
          setVerificationSent(false)
          setPendingUserData(null)
          setIsLogin(true)
          setFirstName('')
          setLastName('')
          setMobile('')
          setPassword('')
          setError('Account already exists. Please login with your credentials.')
          setLoading(false)
          return
        }

        throw new Error(errorData.message || 'Failed to create account in database')
      }

      // Sign out and prompt to login
      await auth.signOut()

      // Reset form and switch to login
      setVerificationSent(false)
      setPendingUserData(null)
      setIsLogin(true)
      setFirstName('')
      setLastName('')
      setMobile('')
      setPassword('')
      setError('Account created successfully! Please login with your credentials.')

    } catch (error) {
      console.error('Verification check error:', error)
      setError(error.message || 'Failed to verify email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resendVerificationEmail = async () => {
    setLoading(true)
    setError('')

    try {
      // Sign in temporarily to resend verification
      const userCredential = await signInWithEmailAndPassword(auth, pendingUserData.email, password)
      const user = userCredential.user

      await sendEmailVerification(user, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      })

      await auth.signOut()
      setError('Verification email resent! Please check your inbox.')

    } catch (error) {
      console.error('Resend verification error:', error)
      setError('Failed to resend verification email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Resend verification from login prompt
  const resendVerificationFromLogin = async () => {
    setLoading(true)
    setError('')

    try {
      if (unverifiedUser && unverifiedUser.user) {
        await sendEmailVerification(unverifiedUser.user, {
          url: `${window.location.origin}/login`,
          handleCodeInApp: false,
        })

        await auth.signOut()
        setError('Verification email sent! Please check your inbox and click the verification link.')
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      setError('Failed to send verification email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Check verification status from login prompt
  const checkVerificationFromLogin = async () => {
    setLoading(true)
    setError('')

    try {
      if (unverifiedUser && unverifiedUser.user) {
        // Reload user to get latest verification status
        await unverifiedUser.user.reload()

        if (!unverifiedUser.user.emailVerified) {
          setError('Email not verified yet. Please check your inbox and click the verification link.')
          setLoading(false)
          return
        }

        // Email is verified, proceed with login
        setShowVerificationPrompt(false)
        setUnverifiedUser(null)

        // Fetch user profile data from API
        try {
          const token = await unverifiedUser.user.getIdToken()
          const response = await fetch(`${API_BASE_URL}/api/customers/profile?email=${unverifiedUser.user.email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })

          if (response.ok) {
            const profileData = await response.json()

            // Store profile data in localStorage for persistence
            localStorage.setItem('userProfile', JSON.stringify({
              customerId: profileData.customerId,
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              email: profileData.email,
              mobile: profileData.mobile,
              shippingAddress: profileData.shippingAddress || null,
              billingAddress: profileData.billingAddress || null,
              uid: unverifiedUser.user.uid
            }))
          }
        } catch (profileError) {
          console.error('Error fetching profile:', profileError)
        }

        router.push('/')
      }
    } catch (error) {
      console.error('Verification check error:', error)
      setError('Failed to verify email status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered'
      case 'auth/invalid-email':
        return 'Please enter a valid email address'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  // Show verification prompt for unverified login attempt
  if (showVerificationPrompt && unverifiedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
              <FiMail className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Email Not Verified
            </h2>
            <p className="text-gray-600 mb-6">
              Your email <span className="font-semibold">{unverifiedUser.email}</span> is not verified yet.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                Please verify your email address to access your account. Check your inbox for the verification link or request a new one below.
              </p>
            </div>
          </div>

          {error && (
            <div className={`${error.includes('sent') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'} border px-4 py-3 rounded relative`} role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={checkVerificationFromLogin}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'I\'ve Verified My Email'}
            </button>

            <button
              onClick={resendVerificationFromLogin}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </button>

            <button
              onClick={async () => {
                await auth.signOut()
                setShowVerificationPrompt(false)
                setUnverifiedUser(null)
                setError('')
              }}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show verification pending screen (after registration)
  if (verificationSent && pendingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <FiMail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a verification link to <span className="font-semibold">{pendingUserData.email}</span>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Please check your email and click the verification link to activate your account.
              </p>
            </div>
          </div>

          {error && (
            <div className={`${error.includes('successfully') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'} border px-4 py-3 rounded relative`} role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={checkVerificationAndCreateAccount}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'I\'ve Verified My Email'}
            </button>

            <button
              onClick={resendVerificationEmail}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </button>

            <button
              onClick={() => {
                setVerificationSent(false)
                setPendingUserData(null)
                setIsLogin(true)
              }}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </button>
          </div>
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
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="font-medium text-black hover:text-gray-800 underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </div>
          )}

          {!isLogin && (
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                placeholder="10-digit mobile number"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-black hover:text-gray-800">
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}