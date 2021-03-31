import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { APIKEY, AUTHDOMAIN, PROJECTID} from 'react-native-dotenv'
// require('dotenv').config();

// Initialize Firebase
const firebaseConfig = {
  // apiKey: "AIzaSyCXn2U-MVtTL5HveA1c5OwjfXt3Wl3FdD0",
  //   authDomain: "petimist-2021.firebaseapp.com",
  //   projectId: "petimist-2021"
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  // storageBucket: process.env.STORAGEBUCKET,
  // messagingSenderId: process.env.MESSAGINGSENDERID,
  // appId: process.env.APPID,
  // measurementId: process.env.MEASUREMENTID,
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(process.env);

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('logged in', user);
    // store.dispatch('setUserAction', user);
  } else {
    // store.dispatch('setUserAction', null);
  }
});
// for accessing firestore database
export const db = firebase.firestore();
