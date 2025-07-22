// frontend/src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-4c9zc6J-31QPaHz8Dfj6H76AWjgAZEI",
  authDomain: "project-drishti-v1-b22d8.firebaseapp.com",
  projectId: "project-drishti-v1-b22d8",
  storageBucket: "project-drishti-v1-b22d8.firebasestorage.app",
  messagingSenderId: "957635250246",
  appId: "1:957635250246:web:0875cb42aa6b75242ea247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Auth and export
const auth = getAuth(app);

export { db, auth }; 