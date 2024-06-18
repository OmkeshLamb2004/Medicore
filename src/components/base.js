// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMTWrvugjt5LerpFS_zPjAz97o4RMdNXU",
  authDomain: "medicore-4fd9e.firebaseapp.com",
  projectId: "medicore-4fd9e",
  storageBucket: "medicore-4fd9e.appspot.com",
  messagingSenderId: "570403910351",
  appId: "1:570403910351:web:2753944e7de9f6f56dfdba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
export const database = getDatabase(app);
// const auth = getAuth(app);
// export {db, auth}
