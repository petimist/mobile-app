import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {APIKEY, AUTHDOMAIN, PROJECTID} from "@env"

// Initialize Firebase
console.log(APIKEY, AUTHDOMAIN, PROJECTID)
const firebaseConfig = {
  apiKey: 'AIzaSyCXn2U-MVtTL5HveA1c5OwjfXt3Wl3FdD0',
  authDomain: 'petimist-2021.firebaseapp.com',
  databaseURL: 'https://petimist-2021-default-rtdb.firebaseio.com',
  projectId: 'petimist-2021',
  storageBucket: 'petimist-2021.appspot.com',
  messagingSenderId: '593747444736',
  appId: '1:593747444736:web:bbb01d9d916bb25a18c4e5',
  measurementId: 'G-874BSFE9N9',
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
