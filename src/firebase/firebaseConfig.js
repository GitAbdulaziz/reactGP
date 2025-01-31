import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile // Import updateProfile
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH,
    projectId: "gp-authentication-afbd4",
    storageBucket: "gp-authentication-afbd4.firebasestorage.app",
    messagingSenderId: "368205188236",
    appId: "1:368205188236:web:c9b89f09ccbd79cf59bfa9",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app); // Firestore instance

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
