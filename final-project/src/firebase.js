// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1m8yPsxPbBf7XYkFSqURnRs8txoIqa6w",
  authDomain: "cs110-final-proj.firebaseapp.com",
  projectId: "cs110-final-proj",
  storageBucket: "cs110-final-proj.appspot.com",
  messagingSenderId: "784929132929",
  appId: "1:784929132929:web:194245d4c7b6f79ed05880",
  measurementId: "G-W03LKN9CKH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);