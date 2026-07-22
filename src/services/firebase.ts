import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBwqIXAtkoLjjJWrcRXVkXN6UrR5MMhA4o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bazaar-e-hunar.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bazaar-e-hunar",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bazaar-e-hunar.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "323965372790",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:323965372790:web:b3aba9d65c0893b82c1257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

