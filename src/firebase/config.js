import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyBcjwepYXfSXCqUchS62u8IRA7m9wX1hrY",
  authDomain: "react-curso-235e3.firebaseapp.com",
  projectId: "react-curso-235e3",
  storageBucket: "react-curso-235e3.appspot.com",
  messagingSenderId: "186873500664",
  appId: "1:186873500664:web:f8e33f04b2f040ec4ffc0d"
};


export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );