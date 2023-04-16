// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firestore, { Firestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = new Firestore(app);
export { app, auth, provider, db };
