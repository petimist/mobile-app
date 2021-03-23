import React, { Component } from 'react'
import { Button } from 'react-native';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput } from 'react-native'
import {db} from '../plugins/firebase'

// type Props = {
//   navigation: Navigation;
// };

class Dashboard extends Component {
  constructor() {

    super();

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

  createPet = () => {
    this.setState({
      isLoading: true
    })
    // Add a new document with a generated id.
    db.collection("TEST-PET").add({
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
          placeholder='add a new pet'
          value={this.state.name}
          onChangeText={(val) => this.inputValueUpdate(val, 'name')}
        >
        </TextInput>
        <Button title='add' onPress={this.createPet} >
        </Button>
        <Button title='go to PetScreen' onPress={() => this.props.navigation.navigate('PetScreen')} >

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
export default Dashboard