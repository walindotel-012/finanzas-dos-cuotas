// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGoyv5EnyETbJmCLmiD2cFUwen_1K7hVY",
  authDomain: "finanzas-app-spa.firebaseapp.com",
  projectId: "finanzas-app-spa",
  storageBucket: "finanzas-app-spa.firebasestorage.app",
  messagingSenderId: "936961369627",
  appId: "1:936961369627:web:620c59b646c267ef303abe"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
