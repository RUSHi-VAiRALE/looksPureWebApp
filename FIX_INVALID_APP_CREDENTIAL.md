# Fix: INVALID_APP_CREDENTIAL Error

## 🔴 Error Explanation

The `INVALID_APP_CREDENTIAL` error occurs when Firebase cannot validate your app credentials. This is usually because:

1. ❌ Environment variables are missing or incorrect
2. ❌ Firebase API key is invalid
3. ❌ Phone Authentication is not enabled
4. ❌ API key restrictions are blocking the request

---

## ✅ Solution (Step-by-Step)

### Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the **Settings gear icon** → **Project settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** → **Web** (</> icon)
6. Register your app with a nickname (e.g., "LooksPure Web")
7. Copy the `firebaseConfig` object

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 2: Create `.env.local` File

Create a file named `.env.local` in your project root directory:

**Location:** `C:\Users\91932\RushiProjects\LooksPure\lookspure\.env.local`

**Contents:**
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**⚠️ Important:**
- Replace the values with YOUR actual Firebase credentials
- Do NOT use quotes around the values
- Do NOT commit this file to Git (it should be in `.gitignore`)

### Step 3: Enable Phone Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Sign-in method** tab
3. Find **Phone** in the list
4. Click on it
5. Toggle **Enable**
6. Click **Save**

### Step 4: Add Test Phone Number (Optional but Recommended)

1. In the same **Sign-in method** page
2. Scroll down to **Phone numbers for testing**
3. Click **Add phone number**
4. Add:
   - Phone number: `+919999999999`
   - Test code: `123456`
5. Click **Add**

### Step 5: Check API Key Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** → **Credentials**
4. Find your API key (should match the one in `.env.local`)
5. Click on it to edit
6. Under **Application restrictions**:
   - For development: Choose **None**
   - For production: Choose **HTTP referrers** and add your domains
7. Under **API restrictions**:
   - Choose **Don't restrict key** (or select specific APIs)
8. Click **Save**

### Step 6: Restart Your Development Server

**Stop your current server** (Ctrl+C in terminal)

**Restart:**
```bash
npm run dev
```

The environment variables will now be loaded.

---

## 🧪 Test the Fix

1. Open your browser to `http://localhost:3000/register`
2. Enter a test phone number: `9999999999`
3. Click "Send OTP"
4. If using test number, enter OTP: `123456`
5. Should work now! ✅

---

## 🔍 Verify Environment Variables Are Loaded

Add this temporarily to your `LoginRegister.js` component (inside the component function):

```javascript
// Temporary debug code - remove after testing
useEffect(() => {
  console.log('Firebase Config Check:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Present' : '❌ Missing',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Present' : '❌ Missing',
  });
}, []);
```

Check the browser console. You should see all "✅ Present".

---

## 🚨 Common Mistakes

### ❌ Wrong: Using quotes in .env.local
```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."  # WRONG!
```

### ✅ Correct: No quotes
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...  # CORRECT!
```

### ❌ Wrong: Missing NEXT_PUBLIC_ prefix
```env
FIREBASE_API_KEY=AIzaSy...  # WRONG! Won't work in browser
```

### ✅ Correct: With NEXT_PUBLIC_ prefix
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...  # CORRECT!
```

### ❌ Wrong: Spaces around equals sign
```env
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSy...  # WRONG!
```

### ✅ Correct: No spaces
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...  # CORRECT!
```

---

## 📋 Complete Checklist

- [ ] Created `.env.local` file in project root
- [ ] Added all Firebase credentials (no quotes)
- [ ] Enabled Phone Authentication in Firebase Console
- [ ] Added test phone number (+919999999999 → 123456)
- [ ] Checked API key restrictions (set to "None" for dev)
- [ ] Restarted development server
- [ ] Tested with test phone number
- [ ] Verified no errors in browser console

---

## 🎯 Quick Fix Summary

**The most common cause is missing `.env.local` file.**

**Quick fix:**
1. Create `.env.local` in project root
2. Add your Firebase credentials
3. Restart server: `npm run dev`
4. Test again

---

## 🆘 Still Not Working?

### Check Browser Console

Open browser console (F12) and look for:
- Firebase initialization errors
- Environment variable values (should not be undefined)
- Network errors

### Check Firebase Console

1. Go to **Authentication** → **Users** tab
2. Try to manually add a user to verify Firebase is working
3. Check **Usage** tab for any quota issues

### Verify Firebase Project

Make sure you're using the correct Firebase project:
1. Check project ID in Firebase Console
2. Compare with `NEXT_PUBLIC_FIREBASE_PROJECT_ID` in `.env.local`
3. They should match exactly

### Check .gitignore

Make sure `.env.local` is in your `.gitignore`:

```gitignore
# local env files
.env*.local
```

This prevents accidentally committing your credentials.

---

## 📞 Example .env.local Template

Copy this template and replace with your values:

```env
# ============================================
# Firebase Configuration
# Get these from: Firebase Console → Project Settings → Your apps
# ============================================

# Your Firebase API Key
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Your Firebase Auth Domain (usually projectname.firebaseapp.com)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com

# Your Firebase Project ID
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# Your Firebase Storage Bucket (usually projectname.appspot.com)
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Your Firebase Messaging Sender ID (numeric)
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012

# Your Firebase App ID
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Your Firebase Measurement ID (optional, for Analytics)
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# ============================================
# Other Environment Variables (if needed)
# ============================================

# Your backend API URL (if you have one)
# NEXT_PUBLIC_URL=http://localhost:3000
```

---

## ✅ Success Indicators

After fixing, you should see:
- ✅ No `INVALID_APP_CREDENTIAL` error
- ✅ "Send OTP" button works
- ✅ SMS is sent (or test OTP works)
- ✅ No errors in browser console
- ✅ Firebase Console shows authentication attempts

---

## 🎉 You're Done!

Once you've completed these steps, the error should be resolved and phone authentication should work perfectly!

**Need more help?** Check the browser console for specific error messages.

