// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-NdO5I9yl4IAg0LqwMeBQDcRf6zv3WCg",
  authDomain: "shop-moto-9722c.firebaseapp.com",
  projectId: "shop-moto-9722c",
  storageBucket: "shop-moto-9722c.appspot.com",
  messagingSenderId: "925547449580",
  appId: "1:925547449580:web:2c727c18931248c12869c9",
  measurementId: "G-ZDLC6BJGVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const Auth = getAuth(app);
connectAuthEmulator(Auth, "http://localhost:9099");
connectFirestoreEmulator(db, 'localhost', 8080);

export{db,Auth}