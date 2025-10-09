import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBV2Q-_nJIcRHGUbhtwu8eKN9UAeaPvwQw",
      authDomain: "fir-authentication-8abb6.firebaseapp.com",
      projectId: "fir-authentication-8abb6",
      storageBucket: "fir-authentication-8abb6.appspot.com",
      messagingSenderId: "854259513422",
      appId: "1:854259513422:web:9a3d38f04501b643f0ab1f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
