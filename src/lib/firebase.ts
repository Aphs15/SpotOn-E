
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// A variable to hold the initialized Firebase app instance.
let app;

// Check if all required environment variables are set.
const requiredEnvVars = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
];

// Only initialize Firebase if the configuration is valid.
if (requiredEnvVars.every(Boolean) && !requiredEnvVars.some(val => val?.includes('your-'))) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} else {
    console.warn("Firebase configuration is missing or incomplete. Firebase services will be disabled.");
}

// Conditionally initialize Auth and Firestore only if the app was initialized.
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

export { app, auth, db };
