// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


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

// const auth = getAuth();

// const provider = new GoogleAuthProvider(firebaseapp);
// provider.setCustomParameters({
//     prompt: "select_account"
// })

// export const getGoogle = () => signInWithPopup(auth, provider)
// .then(result => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     return token
// })


// .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     console.log(token)
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
// }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
// });
