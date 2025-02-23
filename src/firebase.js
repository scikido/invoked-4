import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnkyP5FOwBrkf86L6TW44Q7i3AK7tQ9JQ",
    authDomain: "parentconnect-ce6ed.firebaseapp.com",
    projectId: "parentconnect-ce6ed",
    storageBucket: "parentconnect-ce6ed.firebasestorage.app",
    messagingSenderId: "256014955538",
    appId: "1:256014955538:web:8fa2d3048307dfbef294cb",
    measurementId: "G-Z1JVM527TP"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
