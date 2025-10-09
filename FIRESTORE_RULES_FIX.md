# Fix Firestore Security Rules for Visitor Count

## The Problem
You're getting this error: `FirebaseError: Missing or insufficient permissions`

This happens because Firestore security rules are blocking read/write operations to the visitor count document.

## Quick Fix (For Development/Testing)

### Step 1: Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fir-authentication-8abb6`

### Step 2: Navigate to Firestore Rules
1. Click on "Firestore Database" in the left sidebar
2. Click on the "Rules" tab

### Step 3: Update the Rules
Replace the existing rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write access to analytics collection
    match /analytics/{document} {
      allow read, write: if true;
    }
    
    // Block access to all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 4: Publish the Rules
1. Click "Publish" button
2. Wait for the rules to be deployed

## Alternative: More Restrictive Rules (Recommended for Production)

If you want more security, use these rules instead:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to visitor count
    match /analytics/visitorCount {
      allow read: if true;
      allow write: if true; // Allow writes for now, restrict later
    }
    
    // Block access to all other documents
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Test the Fix

After updating the rules:
1. Refresh your application
2. Check the browser console - the error should be gone
3. The visitor count should now work properly

## Security Notes

- The first rule set allows full access to the analytics collection
- The second rule set is more restrictive and only allows access to the visitorCount document
- For production, consider implementing rate limiting and authentication
- Monitor your Firestore usage in the Firebase Console

## Troubleshooting

If you still get errors:
1. Make sure you clicked "Publish" after updating the rules
2. Wait a few minutes for the rules to propagate
3. Check that your Firebase project ID is correct in the config
4. Verify the collection name is exactly "analytics" and document is "visitorCount"
