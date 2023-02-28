// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBujNkaXBc399nzO_z52S84Mm5snDn_G4c",
  authDomain: "react-ken.firebaseapp.com",
  projectId: "react-ken",
  storageBucket: "react-ken.appspot.com",
  messagingSenderId: "1077564947015",
  appId: "1:1077564947015:web:a434308650b14a3351cf62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
