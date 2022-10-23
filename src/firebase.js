import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDjdy3V88j5Suezjl4PQGFK8_rKV_7DHk4",
  authDomain: "disney-plus-b94dc.firebaseapp.com",
  databaseURL: "https://disney-plus-b94dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "disney-plus-b94dc",
  storageBucket: "disney-plus-b94dc.appspot.com",
  messagingSenderId: "84633850042",
  appId: "1:84633850042:web:0206fd92a0f5ac424c7283",
  measurementId: "G-00524T52R7"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();



export { auth, provider, storage };
export default db;

