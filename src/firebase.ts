// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const KEY = import.meta.env.VITE_SOME_KEY;

const firebaseConfig = {
  apiKey: `${KEY}`,
  authDomain: "towerofprogress-da984.firebaseapp.com",
  projectId: "towerofprogress-da984",
  storageBucket: "towerofprogress-da984.appspot.com",
  messagingSenderId: "185301771931",
  appId: "1:185301771931:web:d2cdb35e91b8c53260083e",
  measurementId: "G-42ST63CNW2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
