// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdP_6o2ORt6sSKG1JPaOijqXi8ACAqEeQ",
  authDomain: "fintelligent-adfce.firebaseapp.com",
  projectId: "fintelligent-adfce",
  storageBucket: "fintelligent-adfce.appspot.com",
  messagingSenderId: "634779553599",
  appId: "1:634779553599:web:37d5bdcdbb255ec456cd8a",
  measurementId: "G-DN2SBNJNQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, provider, db, storage };
