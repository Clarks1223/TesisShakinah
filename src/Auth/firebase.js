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
  apiKey: "AIzaSyCqDW_zhpSuBGIhQk8FOpJy0U85hdnf19k",
  authDomain: "shakinah-peluqueria.firebaseapp.com",
  projectId: "shakinah-peluqueria",
  storageBucket: "shakinah-peluqueria.appspot.com",
  messagingSenderId: "1092399229537",
  appId: "1:1092399229537:web:93ddea865f37cb92bad820",
  measurementId: "G-HM36VX8SLW"
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
