import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA71mR0Y7baQmf9UMxngjb2YXDeZNJSruU",
  authDomain: "react-project-8b296.firebaseapp.com",
  databaseURL: "https://react-project-8b296-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-project-8b296",
  storageBucket: "react-project-8b296.firebasestorage.app",
  messagingSenderId: "557643527404",
  appId: "1:557643527404:web:c820eff0b8cbf0b91f21c9"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);