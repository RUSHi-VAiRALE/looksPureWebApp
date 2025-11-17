# Environment Setup Guide

## 🚨 IMPORTANT: Fix INVALID_APP_CREDENTIAL Error

You're seeing this error because your Firebase environment variables are not configured.

---

## 📝 Step-by-Step Setup

### Step 1: Get Your Firebase Credentials

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Select or Create Project:**
   - Select your existing project, OR
   - Click "Add project" to create a new one

3. **Get Your Web App Credentials:**
   - Click the **Settings gear icon** (top left)
   - Click **Project settings**
   - Scroll down to **Your apps** section
   - If you see a web app (</> icon), click on it
   - If no web app exists:
     - Click **Add app** button
     - Select **Web** (</> icon)
     - Give it a name: "LooksPure Web"
     - Click **Register app**

4. **Copy the Config:**
   - You'll see a `firebaseConfig` object
   - Copy all the values (you'll need them in the next step)

Example of what you'll see:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABCDEF123456789",
  authDomain: "myproject.firebaseapp.com",
  projectId: "myproject-12345",
  storageBucket: "myproject.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123",
  measurementId: "G-ABC123XYZ"
};
```

---

### Step 2: Create .env.local File

1. **Create a new file** in your project root directory:
   - File name: `.env.local`
   - Location: `C:\Users\91932\RushiProjects\LooksPure\lookspure\.env.local`

2. **Add this content** (replace with YOUR values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyABCDEF123456789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=myproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=myproject-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=myproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

**⚠️ IMPORTANT RULES:**
- ✅ NO quotes around values
- ✅ NO spaces around the `=` sign
- ✅ Replace ALL values with YOUR actual Firebase credentials
- ✅ Keep the `NEXT_PUBLIC_` prefix (required for Next.js)

---

### Step 3: Enable Phone Authentication

1. **In Firebase Console**, go to **Authentication** (left sidebar)
2. Click **Sign-in method** tab
3. Find **Phone** in the list of providers
4. Click on **Phone**
5. Toggle the **Enable** switch
6. Click **Save**

---

### Step 4: Add Test Phone Number (Recommended)

1. **Still in Sign-in method page**, scroll down
2. Find **Phone numbers for testing**
3. Click **Add phone number**
4. Enter:
   - Phone number: `+919999999999`
   - Test code: `123456`
5. Click **Add**

This allows you to test without sending real SMS messages!

---

### Step 5: Restart Your Server

**IMPORTANT:** You must restart your development server for environment variables to load.

1. **Stop the current server:**
   - Press `Ctrl + C` in your terminal

2. **Start it again:**
   ```bash
   npm run dev
   ```

---

## 🧪 Test It Works

1. **Open your browser:**
   - Go to: `http://localhost:3000/register`

2. **Enter test phone number:**
   - Type: `9999999999` (without +91)
   - Click **Send OTP**

3. **Enter test OTP:**
   - Type: `123456`
   - Click **Verify OTP**

4. **Fill in details:**
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Click **Complete Registration**

5. **Success!** ✅
   - You should be redirected to the home page
   - No errors in the console

---

## 🔍 Troubleshooting

### Error: "INVALID_APP_CREDENTIAL" still appears

**Check:**
1. Did you create `.env.local` in the correct location?
2. Did you restart the server after creating `.env.local`?
3. Are all values correct (no typos)?
4. Did you remove quotes from values?

**Verify environment variables are loaded:**

Add this to `LoginRegister.js` temporarily (line 29, after the state declarations):

```javascript
useEffect(() => {
  console.log('🔍 Environment Check:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅' : '❌',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌',
  });
}, []);
```

Open browser console (F12) and check. All should show ✅.

### Error: "Phone authentication not enabled"

**Fix:**
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Phone provider
3. Save

### Error: "reCAPTCHA not working"

**Fix:**
1. Make sure `localhost` is in authorized domains
2. Firebase Console → Authentication → Settings → Authorized domains
3. `localhost` should be listed by default

### Error: "Too many requests"

**Fix:**
1. Use test phone numbers during development
2. Wait a few minutes before trying again
3. Check Firebase Console for quota limits

---

## 📋 Quick Checklist

Before testing, make sure:

- [ ] Created `.env.local` file in project root
- [ ] Added all 7 Firebase environment variables
- [ ] Values have NO quotes
- [ ] Values are YOUR actual Firebase credentials
- [ ] Enabled Phone Authentication in Firebase Console
- [ ] Added test phone number (+919999999999 → 123456)
- [ ] Restarted development server (`npm run dev`)
- [ ] Opened browser to `http://localhost:3000/register`
- [ ] Browser console shows no errors

---

## 📁 File Structure Check

Your project should look like this:

```
lookspure/
├── .env.local          ← YOU NEED TO CREATE THIS FILE
├── .gitignore          ← Should contain .env*.local
├── src/
│   ├── components/
│   │   └── auth/
│   │       └── LoginRegister.js
│   └── lib/
│       └── firebase.js
├── package.json
└── ... other files
```

---

## 🎯 What Each Environment Variable Does

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Identifies your Firebase project | `AIzaSyABC...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Authentication domain | `myproject.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Unique project identifier | `myproject-12345` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Cloud storage bucket | `myproject.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Cloud messaging ID | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Web app identifier | `1:123...` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Analytics ID (optional) | `G-ABC123` |

---

## 🔒 Security Note

**NEVER commit `.env.local` to Git!**

Your `.gitignore` should contain:
```
.env*.local
```

This is already configured in Next.js projects by default.

---

## ✅ Success!

Once you complete these steps:
- ✅ No more `INVALID_APP_CREDENTIAL` error
- ✅ Phone authentication works
- ✅ OTP is sent and verified
- ✅ Users can register and login

---

## 📞 Need More Help?

1. Check `FIX_INVALID_APP_CREDENTIAL.md` for detailed troubleshooting
2. Check browser console (F12) for specific errors
3. Check Firebase Console → Authentication → Users for activity
4. Verify all steps above are completed

**You've got this!** 🚀

