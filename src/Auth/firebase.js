// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu3igoXwc714IclMn1D3t4oSTvaKUmi2Q",
  authDomain: "peluqueriatest-308f7.firebaseapp.com",
  projectId: "peluqueriatest-308f7",
  storageBucket: "peluqueriatest-308f7.appspot.com",
  messagingSenderId: "1041324579824",
  appId: "1:1041324579824:web:2f492939710806d1b7db35",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export { fireBaseApp };
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(fireBaseApp);
export { auth };
//base de datos con tablas
const fireStore = getFirestore(fireBaseApp);
export { fireStore };

//Storage
const storage = getStorage(fireBaseApp);
export { storage };
