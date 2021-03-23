import React, { Component } from 'react'
import { Button } from 'react-native';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput } from 'react-native'
import { db } from '../plugins/firebase'

class PetScreen extends Component {
  constructor() {

    super();

    this.state = {
      isLoading: true,
      petArr: []
    }

  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  componentDidMount() {
    this.unsubscribe = db.collection('TEST-PET').onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapShot) => {
    const petArr = [];
    querySnapShot.forEach((res) => {
      const { name } = res.data();
      petArr.push({
        key: res.id,
        res,
        name,
      })
    })
    this.setState({
      petArr,
      isLoading: false
    })
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

        { this.state.petArr.map((item, key) => (
          <Text key={key} style={styles.TextStyle}> { item.name} </Text>)
        )}
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
export default PetScreen