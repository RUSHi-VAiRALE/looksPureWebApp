# Firebase SMS Authentication Setup Guide

## Overview
This guide explains the SMS Multi-factor Authentication implementation in your LoginRegister component and the required Firebase configuration.

## Implementation Summary

### What Was Changed

1. **Removed Email/Password Authentication**
   - Removed `createUserWithEmailAndPassword` and `signInWithEmailAndPassword`
   - Removed email verification flow
   - Removed all API calls to backend

2. **Implemented Phone Authentication**
   - Added Firebase Phone Authentication with OTP
   - Integrated reCAPTCHA for bot protection
   - Direct Firestore integration for user data storage

3. **New Registration Flow**
   - User enters mobile number
   - OTP is sent via SMS
   - User verifies OTP
   - User fills in details (First Name, Last Name, Email)
   - Data is saved directly to Firestore `customers` collection

4. **New Login Flow**
   - User enters mobile number
   - OTP is sent via SMS
   - User verifies OTP
   - User data is fetched from Firestore
   - User is logged in and redirected

## Firebase Console Setup Required

### Step 1: Enable Phone Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Phone** provider
5. Click **Enable** toggle
6. Click **Save**

### Step 2: Add Test Phone Numbers (Optional - for development)

1. In the same **Sign-in method** page, scroll down to **Phone numbers for testing**
2. Add test phone numbers with verification codes (e.g., +919999999999 → 123456)
3. This allows testing without sending real SMS messages

### Step 3: Configure reCAPTCHA (Important!)

Firebase Phone Auth uses reCAPTCHA to prevent abuse. You have two options:

#### Option A: Invisible reCAPTCHA (Recommended - Already Implemented)
- The code already implements invisible reCAPTCHA
- No additional setup needed
- reCAPTCHA runs automatically in the background

#### Option B: Visible reCAPTCHA (If you face issues)
- Change the reCAPTCHA size from 'invisible' to 'normal' in the code
- Add a visible container for the reCAPTCHA widget

### Step 4: Add Authorized Domains

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your production domain (e.g., `yourdomain.com`)
3. `localhost` is already authorized by default for development

### Step 5: Configure App Check (Optional but Recommended for Production)

1. Navigate to **App Check** in Firebase Console
2. Register your web app
3. Choose reCAPTCHA v3 or reCAPTCHA Enterprise
4. This adds an extra layer of security

## Firestore Database Structure

### Collection: `customers`
Document ID: Phone number in E.164 format (e.g., `+919876543210`)

```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  mobile: "+919876543210",
  uid: "firebase-user-uid",
  phoneNumber: "+919876543210",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  shippingAddress: null,  // Can be updated later
  billingAddress: null    // Can be updated later
}
```

### Firestore Security Rules

Add these rules to your Firestore to secure the customers collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Customers collection
    match /customers/{phoneNumber} {
      // Allow users to read their own data
      allow read: if request.auth != null && 
                     request.auth.token.phone_number == phoneNumber;
      
      // Allow users to create their own document during registration
      allow create: if request.auth != null && 
                       request.auth.token.phone_number == phoneNumber &&
                       request.resource.data.phoneNumber == phoneNumber &&
                       request.resource.data.uid == request.auth.uid;
      
      // Allow users to update their own data
      allow update: if request.auth != null && 
                       request.auth.token.phone_number == phoneNumber &&
                       request.resource.data.uid == request.auth.uid;
      
      // Prevent deletion by users (only admins can delete)
      allow delete: if false;
    }
  }
}
```

## Code Features

### 1. Phone Number Formatting
- Automatically formats 10-digit Indian numbers to E.164 format (+91XXXXXXXXXX)
- Supports other country codes if provided

### 2. OTP Verification
- 6-digit OTP sent via SMS
- OTP expiration handling
- Resend OTP functionality
- Invalid OTP error handling

### 3. Registration Flow
- Check if phone number already exists
- Send OTP
- Verify OTP
- Show user details form
- Save to Firestore
- Auto-login and redirect

### 4. Login Flow
- Send OTP to existing user
- Verify OTP
- Fetch user data from Firestore
- Store in localStorage
- Redirect to home

### 5. Error Handling
- Invalid phone number format
- Too many requests (rate limiting)
- Invalid OTP
- Expired OTP
- Network errors
- reCAPTCHA errors

### 6. UI Features
- Clean, modern design matching existing theme
- Loading states
- Success/Error messages
- Toggle between Login/Register
- Change phone number option
- Resend OTP option

## Testing the Implementation

### Local Testing (Development)

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to the login/register page**

3. **For Registration:**
   - Enter a test phone number (use Firebase test numbers if configured)
   - Click "Send OTP"
   - Enter the OTP received (or test OTP)
   - Fill in First Name, Last Name, and Email
   - Click "Complete Registration"

4. **For Login:**
   - Enter the registered phone number
   - Click "Send OTP"
   - Enter the OTP received
   - You should be logged in and redirected

### Production Testing

1. **Deploy to your hosting platform**
2. **Add your production domain to Firebase Authorized Domains**
3. **Test with real phone numbers**
4. **Monitor Firebase Console for authentication events**

## Common Issues and Solutions

### Issue 1: reCAPTCHA Not Working
**Solution:** 
- Check browser console for errors
- Ensure domain is authorized in Firebase
- Try clearing browser cache
- Check if ad blockers are interfering

### Issue 2: OTP Not Received
**Solution:**
- Verify phone number format is correct
- Check Firebase Console quotas
- Ensure Phone Auth is enabled
- Check if number is in test mode

### Issue 3: "Too Many Requests" Error
**Solution:**
- Firebase has rate limits on SMS
- Use test phone numbers during development
- Implement App Check for production
- Wait before retrying

### Issue 4: User Data Not Saving to Firestore
**Solution:**
- Check Firestore security rules
- Verify user is authenticated
- Check browser console for errors
- Ensure Firestore is initialized properly

### Issue 5: reCAPTCHA Container Error
**Solution:**
- Ensure `<div id="recaptcha-container"></div>` exists in DOM
- Check if reCAPTCHA is being initialized multiple times
- Clear reCAPTCHA verifier on component unmount

## Environment Variables

Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Additional Considerations

### SMS Costs
- Firebase Phone Auth uses Google Cloud Platform for SMS
- Check [Firebase Pricing](https://firebase.google.com/pricing) for SMS costs
- Consider implementing rate limiting to prevent abuse

### Security Best Practices
1. Always use HTTPS in production
2. Implement App Check
3. Set up proper Firestore security rules
4. Monitor authentication logs
5. Implement rate limiting
6. Use test phone numbers during development

### User Experience
1. Clear error messages
2. Loading indicators
3. OTP auto-fill support (browser-dependent)
4. Resend OTP with cooldown timer (optional enhancement)
5. Remember phone number (optional enhancement)

## Next Steps

1. ✅ Enable Phone Authentication in Firebase Console
2. ✅ Add authorized domains
3. ✅ Set up Firestore security rules
4. ✅ Test with test phone numbers
5. ✅ Deploy and test in production
6. ✅ Monitor usage and costs
7. ✅ Implement additional security measures (App Check)

## Support

If you encounter any issues:
1. Check Firebase Console logs
2. Check browser console for errors
3. Review Firestore security rules
4. Verify Firebase configuration
5. Check network requests in browser DevTools

## Summary

Your authentication system now uses:
- ✅ Firebase Phone Authentication (SMS OTP)
- ✅ Direct Firestore integration (no backend API)
- ✅ reCAPTCHA protection
- ✅ Clean, modern UI
- ✅ Proper error handling
- ✅ Secure data storage

The implementation is production-ready once you complete the Firebase Console setup!

