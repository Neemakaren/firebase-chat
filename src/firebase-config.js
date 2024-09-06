// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ_Sh1rbc3vhdrkX8afVDuK3_bqyy739E",
  authDomain: "chat-app-7635a.firebaseapp.com",
  projectId: "chat-app-7635a",
  storageBucket: "chat-app-7635a.appspot.com",
  messagingSenderId: "533346443784",
  appId: "1:533346443784:web:7c5d4c40ee810be07267bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)