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
  apiKey: "AIzaSyCi2XCYg4e6gr3UR5hYURcFKS7Z-rlthnw",
  authDomain: "paginawebymovil.firebaseapp.com",
  projectId: "paginawebymovil",
  storageBucket: "paginawebymovil.appspot.com",
  messagingSenderId: "883709923602",
  appId: "1:883709923602:web:337cabad24e6404bd3a3cb",
  measurementId: "G-9SKM9KZW1W",
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
