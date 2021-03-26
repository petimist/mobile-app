import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput } from 'react-native'
import { db } from '../plugins/firebase'
import { currentUser } from '../services/auth'


class appointmentInfo extends Component {
  constructor() {

    super();

    this.userRef = db.collection("users").doc(currentUser().uid)

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
    this.unsubscribe = this.userRef.collection('appointment').onSnapshot(this.getCollection);
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
      <View style={styles.container}>

        { this.state.petArr.map((item, key) => (
          <Text key={item.key}
            onPress={() => this.props.navigation.navigate('editAppointment', {id: item.key})}
            style={styles.TextStyle}> { item.name}  </Text>)
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center"
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
export default appointmentInfo