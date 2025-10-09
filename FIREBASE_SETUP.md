# Firebase Setup Guide for Global Visitor Count

This guide will help you set up Firebase Firestore to enable a global visitor count feature for your Diabetopedia application.

## Prerequisites

- A Google account
- Access to the Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "diabetopedia-analytics")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for now (you can secure it later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "Diabetopedia Web")
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 5: Set up Firestore Security Rules (Optional but Recommended)

1. In Firebase Console, go to "Firestore Database" > "Rules"
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to visitor count
    match /analytics/visitorCount {
      allow read: if true;
      allow write: if true; // For development - restrict in production
    }
  }
}
```

3. Click "Publish"

## Step 6: Test the Implementation

1. Start your development server: `npm run dev`
2. Open your application in a browser
3. Check the footer - you should see the visitor count
4. Open the same page in an incognito window or different browser
5. The count should increment globally

## Step 7: Monitor in Firebase Console

1. Go to Firestore Database in Firebase Console
2. You should see a collection called "analytics"
3. Inside it, there should be a document called "visitorCount"
4. This document contains the global visitor count

## Features of This Implementation

- **Global Count**: All users see the same visitor count
- **Session-Based**: Only increments once per browser session (not on page refresh)
- **Real-time Updates**: Count updates in real-time across all users
- **Fallback**: Falls back to localStorage if Firebase is unavailable
- **Loading State**: Shows loading indicator while fetching count
- **Error Handling**: Gracefully handles Firebase connection issues

## Security Considerations

For production, consider:
1. Setting up proper Firestore security rules
2. Implementing rate limiting
3. Adding authentication if needed
4. Monitoring usage and costs

## Troubleshooting

- **Count not updating**: Check Firebase configuration and network connection
- **Permission denied**: Verify Firestore security rules
- **Loading forever**: Check browser console for errors
- **Count resets**: Ensure you're using the same Firebase project

## Cost Considerations

- Firestore has a free tier with generous limits
- Read/write operations are very cheap
- For a typical website, costs should be minimal
