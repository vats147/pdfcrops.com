// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDEvzpT3FMQ4U32Xv-4sa6n2zPt1geJfo",
    authDomain: "pdfcrops-92540.firebaseapp.com",
    projectId: "pdfcrops-92540",
    storageBucket: "pdfcrops-92540.appspot.com",
    messagingSenderId: "416284157285",
    appId: "1:416284157285:web:3a0315c704aebd25002d8c",
    measurementId: "G-BRL79MR0BB"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export { auth }