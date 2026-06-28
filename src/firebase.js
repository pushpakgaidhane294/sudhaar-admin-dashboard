import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKN3cXtE2n31gqORVO7hSEQQA_32v117Q",
  authDomain: "sudhar-app-6392d.firebaseapp.com",
  projectId: "sudhar-app-6392d",
  storageBucket: "sudhar-app-6392d.firebasestorage.app",
  messagingSenderId: "384113607186",
  appId: "1:384113607186:web:ee36ce359e6ce3723ececb",
  measurementId: "G-EMVTGS1FFX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
