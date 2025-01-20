import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth , signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
/*const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};*/

const firebaseConfig = {  
  apiKey: "AIzaSyCG32gqRWrN-mOFNiRpdlMRnWd4PmpNXgc",
  authDomain: "jeromotosdb-a9cb8.firebaseapp.com",
  projectId: "jeromotosdb-a9cb8",
  storageBucket: "jeromotosdb-a9cb8.appspot.com",
  messagingSenderId: "307960456482",
  appId: "1:307960456482:web:88493018f7b4e064aaf17b",
  measurementId: "G-20T0BTJ8JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, database, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword }
