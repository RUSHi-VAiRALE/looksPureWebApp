# Quick Start Guide - SMS Authentication

## What Changed?

Your authentication system has been completely migrated from **Email/Password** to **Phone/SMS OTP** authentication.

## Key Changes

### ✅ Removed
- Email/Password authentication
- Email verification flow
- Backend API calls for user management
- Forgot password page (no longer needed with OTP)

### ✅ Added
- Firebase Phone Authentication with SMS OTP
- Direct Firestore integration
- reCAPTCHA protection
- Phone number verification flow

## User Flows

### Registration Flow
```
1. User enters phone number (10 digits)
   ↓
2. System sends OTP via SMS
   ↓
3. User enters 6-digit OTP
   ↓
4. User fills profile (First Name, Last Name, Email)
   ↓
5. Data saved to Firestore 'customers' collection
   ↓
6. User logged in and redirected to home
```

### Login Flow
```
1. User enters phone number
   ↓
2. System sends OTP via SMS
   ↓
3. User enters 6-digit OTP
   ↓
4. System fetches user data from Firestore
   ↓
5. User logged in and redirected to home
```

## Required Firebase Setup (DO THIS FIRST!)

### 1. Enable Phone Authentication
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Phone" provider
3. Save

### 2. Add Test Phone Numbers (for development)
1. In Sign-in method, scroll to "Phone numbers for testing"
2. Add: `+919999999999` with code `123456`
3. Use this for testing without real SMS

### 3. Firestore Security Rules
Add these rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /customers/{phoneNumber} {
      allow read: if request.auth != null && 
                     request.auth.token.phone_number == phoneNumber;
      
      allow create: if request.auth != null && 
                       request.auth.token.phone_number == phoneNumber;
      
      allow update: if request.auth != null && 
                       request.auth.token.phone_number == phoneNumber;
      
      allow delete: if false;
    }
  }
}
```

## Testing Locally

### Using Test Phone Numbers (No SMS sent)
```javascript
Phone: +919999999999
OTP: 123456
```

### Using Real Phone Numbers
1. Enter your real phone number
2. You'll receive an actual SMS
3. Enter the OTP from SMS

## Data Structure

### Firestore Collection: `customers`
Document ID: Phone number (e.g., `+919876543210`)

```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  mobile: "+919876543210",
  phoneNumber: "+919876543210",
  uid: "firebase-uid",
  createdAt: timestamp,
  updatedAt: timestamp,
  shippingAddress: null,
  billingAddress: null
}
```

## Common Issues

### "reCAPTCHA not initialized"
- Refresh the page
- Check if domain is authorized in Firebase

### "Too many requests"
- Use test phone numbers during development
- Wait a few minutes before retrying

### OTP not received
- Check phone number format (must be 10 digits)
- Verify Phone Auth is enabled in Firebase
- Check if using test number correctly

### "No account found"
- User needs to register first
- Check if data exists in Firestore

## Features

✅ Phone number validation (10 digits)
✅ Automatic country code formatting (+91)
✅ OTP verification (6 digits)
✅ Resend OTP functionality
✅ Change phone number option
✅ Loading states and error handling
✅ Clean, modern UI
✅ Direct Firestore integration
✅ No backend API required

## Files Modified

- `src/components/auth/LoginRegister.js` - Complete rewrite
- `src/lib/firebase.js` - Already had Firestore support
- `src/app/login/page.js` - No changes needed
- `src/app/register/page.js` - No changes needed
- `src/app/forgot-password/page.js` - Deleted (not needed)

## Next Steps

1. ✅ Enable Phone Auth in Firebase Console
2. ✅ Add Firestore security rules
3. ✅ Test with test phone numbers
4. ✅ Test with real phone numbers
5. ✅ Deploy to production
6. ✅ Add production domain to Firebase authorized domains

## Production Checklist

- [ ] Phone Authentication enabled
- [ ] Firestore security rules configured
- [ ] Production domain added to authorized domains
- [ ] App Check configured (optional but recommended)
- [ ] SMS costs reviewed and budget set
- [ ] Error monitoring set up
- [ ] User data backup strategy in place

## Support

For detailed information, see `SMS_AUTH_SETUP_GUIDE.md`

## Summary

Your app now uses **Firebase Phone Authentication** with:
- SMS OTP verification
- Direct Firestore storage
- No backend API dependency
- Modern, secure authentication flow

**Ready to test!** 🚀

