// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_C2R5WqVpRT_siOQlUX9s7IYwvfn4GHM",
  authDomain: "firebasics-b0106.firebaseapp.com",
  projectId: "firebasics-b0106",
  storageBucket: "firebasics-b0106.appspot.com",
  messagingSenderId: "41466439381",
  appId: "1:41466439381:web:711c21bb90309d1282e45c",
  measurementId: "G-64H9GG2D5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export { app, db, auth, googleProvider };
