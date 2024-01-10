// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VIET_FIREBASE_KEY,
  authDomain: "social-media-app-29a68.firebaseapp.com",
  projectId: "social-media-app-29a68",
  storageBucket: "social-media-app-29a68.appspot.com",
  messagingSenderId: "1088778663504",
  appId: "1:1088778663504:web:98c0a514a1765c093c8355"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);