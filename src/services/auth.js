import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password, lastName, firstName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(user)
        if (user) {
          Alert.alert("Logged in as", user.user.uid);
          return user.user.uid;
        }
        Alert.alert(user);

      });
    return response;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
    return err.code;
    console.log(err)

  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export function currentUser() {
  try {
    const response = firebase.auth().currentUser;
    return response;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
    return JSON.parse(err.message).error.code;
  }
}
