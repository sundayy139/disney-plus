import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBzYPJG_boESR6MbggodC_Knm8CC5KKh8",
  authDomain: "disney-plus-10948.firebaseapp.com",
  projectId: "disney-plus-10948",
  storageBucket: "disney-plus-10948.appspot.com",
  messagingSenderId: "1045851207706",
  appId: "1:1045851207706:web:1471210b2090c9ab4079a3",
  measurementId: "G-JSE9ZT00K9"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export { auth, provider, storage };
export default db;

