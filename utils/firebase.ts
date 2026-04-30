import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase Auth Setup
// ==================
// This Firebase configuration is preserved for future use when transitioning from local dev auth to real Firebase auth.
// Currently, authentication uses a local AuthProvider (utils/auth.ts) for development.
// To switch to Firebase auth:
//   1. Uncomment the Firebase usage below
//   2. Update auth.ts to use these Firebase functions instead of local state
//   3. Replace useAuth calls with Firebase auth functions (signInWithEmail, onAuthStateChanged, etc.)

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

// Debug: Check if config is loaded
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('⚠️ Firebase config incomplete. Environment variables may not be loaded.');
  console.warn('Config:', firebaseConfig);
}

let firebaseApp;
try {
  firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw error;
}

export const auth = getAuth(firebaseApp);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default firebaseApp;
