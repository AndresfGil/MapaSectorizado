// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcjwepYXfSXCqUchS62u8IRA7m9wX1hrY",
  authDomain: "react-curso-235e3.firebaseapp.com",
  projectId: "react-curso-235e3",
  storageBucket: "react-curso-235e3.appspot.com",
  messagingSenderId: "186873500664",
  appId: "1:186873500664:web:f8e33f04b2f040ec4ffc0d"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );