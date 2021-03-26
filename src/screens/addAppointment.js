import React, { Component } from 'react'
import { Button } from 'react-native';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput } from 'react-native'
import { db } from '../plugins/firebase'
import {currentUser} from '../services/auth'

class addAppointment extends Component {
  constructor() {

    super();

    this.userRef = db.collection("users").doc(currentUser().uid)

    this.state = {
      name: "",
      isLoading: false
    }

  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  createAppointment = () => {
    this.setState({
      isLoading: true
    })
    // Add a new document with a generated id.
    this.userRef.collection('appointment').add({
      name: this.state.name
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState({
          name: '',
          isLoading: false
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          name: '',
          isLoading: false
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <TextInput
          placeholder='Set a new appointment'
          value={this.state.name}
          onChangeText={(val) => this.inputValueUpdate(val, 'name')}
        >
        </TextInput>
        <Button title='add' onPress={this.createAppointment} >
        </Button>
        <Button title='go to Appointment' onPress={() => this.props.navigation.navigate('appointmentInfo')} >

        </Button>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default addAppointment