// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE,
    authDomain: "dinedesign-1cb3e.firebaseapp.com",
    projectId: "dinedesign-1cb3e",
    storageBucket: "dinedesign-1cb3e.firebasestorage.app",
    messagingSenderId: "2709521792",
    appId: "1:2709521792:web:f05d10ae39acc21a3a6d65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);