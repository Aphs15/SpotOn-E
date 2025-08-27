
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs9vGaHWgHO3LCLK6mUMjkI_JYS9vsfDY",
  authDomain: "event-hopper-298iu.firebaseapp.com",
  projectId: "event-hopper-298iu",
  storageBucket: "event-hopper-298iu.firebasestorage.app",
  messagingSenderId: "30468776041",
  appId: "1:30468776041:web:e8916e14214b930630c2f8",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
