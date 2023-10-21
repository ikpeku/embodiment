// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0SnoP5sQZyusUriUtn9OFnuR7PC5R1Nw",
    authDomain: "embodiment-533c5.firebaseapp.com",
    projectId: "embodiment-533c5",
    storageBucket: "embodiment-533c5.appspot.com",
    messagingSenderId: "56142408560",
    appId: "1:56142408560:web:5c34211f7bb15ee1a0fdb5"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseapp)
