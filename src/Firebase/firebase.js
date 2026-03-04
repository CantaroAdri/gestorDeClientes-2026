import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi9BzRNpoC7zplQFy_X3dE8SbqFn-NVqg",
  authDomain: "total-gestor.firebaseapp.com",
  projectId: "total-gestor",
  storageBucket: "total-gestor.firebasestorage.app",
  messagingSenderId: "934096312317",
  appId: "1:934096312317:web:76a97c3278abdb5da36b94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);