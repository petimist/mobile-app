import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhhmA_E1Wt02djKagwZf11ks0m8Awu900",
  authDomain: "simple-calculator-444.firebaseapp.com",
  projectId: "simple-calculator-444",
  storageBucket: "simple-calculator-444.appspot.com",
  messagingSenderId: "159675184226",
  appId: "1:159675184226:web:675a20ade9e81f419c0d3b",
  measurementId: "G-494SQLD6W4"
};

firebase.initializeApp(firebaseConfig);