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
      appArr: []
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
    const appArr = [];
    querySnapShot.forEach((res) => {
      const { date } = res.data();
      const { time } = res.data();
      const { vet } = res.data();
      const { todo } = res.data();
      appArr.push({
        key: res.id,
        res,
        date,
        time,
        vet,
        todo,
      })
    })
    this.setState({
      appArr,
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

        { this.state.appArr.map((item, key) => (
          <Text key={item.key}
            onPress={() => this.props.navigation.navigate('editAppointment', {id: item.key})}
            style={styles.TextStyle}> { item.todo}  </Text>)
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