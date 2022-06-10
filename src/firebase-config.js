// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeUVEucNwSlLuAawrKVwNxl-EbQFeaM98",
  authDomain: "where-s-waldo-12aad.firebaseapp.com",
  projectId: "where-s-waldo-12aad",
  storageBucket: "where-s-waldo-12aad.appspot.com",
  messagingSenderId: "936958627809",
  appId: "1:936958627809:web:dd16e858ae0f7fc22ecca0"
};

// Initialize Firebase
const configApp = initializeApp(firebaseConfig);
export const db = getFirestore(configApp)
