// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtgVa5TDcoCO45UaDaHofLhSRFJlrUXl4",
  authDomain: "reactjs-coder-f0a0f.firebaseapp.com",
  projectId: "reactjs-coder-f0a0f",
  storageBucket: "reactjs-coder-f0a0f.appspot.com",
  messagingSenderId: "365678690139",
  appId: "1:365678690139:web:2b3977eb20430268eda47e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);