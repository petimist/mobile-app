import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  REACT_NATIVE_APIKEY,
  REACT_NATIVE_AUTHDOMAIN,
  REACT_NATIVE_PROJECTID,
  REACT_NATIVE_DBURL,
  REACT_NATIVE_STORAGEBUCKET,
  REACT_NATIVE_MESSAGINGSENDERID,
  REACT_NATIVE_APPID,
  REACT_NATIVE_MEASUREMENTID,
} from '@env';

// Initialize Firebase
console.log(
  REACT_NATIVE_APIKEY,
  REACT_NATIVE_AUTHDOMAIN,
  REACT_NATIVE_PROJECTID
);
const firebaseConfig = {
  apiKey: REACT_NATIVE_APIKEY,
  authDomain: REACT_NATIVE_AUTHDOMAIN,
  databaseURL: REACT_NATIVE_DBURL,
  projectId: REACT_NATIVE_PROJECTID,
  storageBucket: REACT_NATIVE_STORAGEBUCKET,
  messagingSenderId: REACT_NATIVE_MESSAGINGSENDERID,
  appId: REACT_NATIVE_APPID,
  measurementId: REACT_NATIVE_MEASUREMENTID,
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(process.env);

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.getCurrentUser = () =>
  new Promise((resolve, reject) => {
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
