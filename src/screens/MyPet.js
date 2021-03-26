import React, { Component, useState } from 'react'
import {Button, Button as PaperButton, Dialog, Paragraph, Portal, Card, Title} from 'react-native-paper';
import {ImageBackground, StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput, Alert} from 'react-native'
import { db } from '../plugins/firebase'
import {currentUser} from '../services/auth'
import { Appbar } from 'react-native-paper';
import TextInputD from '../components/TextInputDialoct';
import {CardTitle} from "react-native-paper/src/components/Card/CardTitle";


const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

class MyPet extends Component {
  constructor() {
    super();
    this.userRef = db.collection("users").doc(currentUser().uid)
    this.state = {
      name: "",
      birthday: "",
      species: "",
      isLoading: false,
      visible: false,
      petArr: [],
    }
  }

  showDialog = () => {
    this.setState({
      visible: true
    })
  }

  hideDialog = () => {
    this.setState({
      visible: false
    })
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
    this.userRef.collection('pets').add({
      name: this.state.name,
      birthday: this.state.birthday,
      species: this.state.species,

    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState({
          name: '',
          birthday: "",
          species: "",
          isLoading: false
        });
        this.hideDialog()
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          name: '',
          birthday: "",
          species: "",
          isLoading: false
        });
      });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  componentDidMount() {
    this.unsubscribe = this.userRef.collection('pets').onSnapshot(this.getCollection);
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
          <ImageBackground source={image} style={styles.image}>
            <Text style={{marginTop: 50, marginLeft: 150}}> This is MyPet</Text>

            { this.state.petArr.map((pet, key) => (
                <Card style={styles.card} onPress={() => this.props.navigation.navigate('PetInfoScreen', {id: pet.key})}>
                  <Title> {pet.name }</Title>
                </Card>
                )
            )}

            {/*{ this.state.petArr.map((pet, key) => (*/}
            {/*    <Text key={pet.key}*/}
            {/*          onPress={() => this.props.navigation.navigate('PetInfoScreen', {id: pet.key})}*/}
            {/*    > { pet.name}  </Text>)*/}
            {/*)}*/}

            <PaperButton onPress={() => this.props.navigation.navigate('PetScreen')} >
              go to PetScreen
            </PaperButton>

            <PaperButton mode="outline" style={styles.btnADD} icon="plus" color="black" onPress={this.showDialog}>
              <Text style={styles.text}> ADD PET </Text>
            </PaperButton>

            <Portal>
            <Dialog style={{backgroundColor:"#ffe7bb"}} visible={this.state.visible} onDismiss={this.hideDialog}>
              <Dialog.Title>Please fill out the form below</Dialog.Title>
              <Dialog.Content>
                <TextInputD
                    label="Pet's name"
                    value={this.state.name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                >
                </TextInputD>
                <TextInputD
                    label='Birthday'
                    value={this.state.birthday}
                    onChangeText={(val) => this.inputValueUpdate(val, 'birthday')}
                >
                </TextInputD>
                <TextInputD
                    label="Species"
                    value={this.state.species}
                    onChangeText={(val) => this.inputValueUpdate(val, 'species')}
                >
                </TextInputD>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton mode='outline' style={styles.btn} onPress={this.createPet} >
                  <Text style={styles.text1}> add </Text>
                </PaperButton>
                <PaperButton style={styles.btn} onPress={this.hideDialog}>
                  <Text style={styles.text1}> Done </Text>
                </PaperButton>
              </Dialog.Actions>
            </Dialog>
            </Portal>

          </ImageBackground>


          <Appbar style={styles.bottom}>
            <Appbar.Action style={styles.dog} icon="dog" size={40} onPress={() => this.props.navigation.navigate('MyPet')} />

            <Appbar.Action style={styles.home} icon="home" size={40} onPress={() => this.props.navigation.navigate('Dashboard')}/>

            <Appbar.Action style={styles.calendar} icon="calendar" size={40} onPress={() => this.props.navigation.navigate('Appointment')} />
          </Appbar>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: "#6C6665",
  },
  dog:{
    marginLeft: 50,
    marginBottom: 20,
    marginTop: 10,
  },
  home:{
    marginLeft:50,
    marginBottom: 20,
    marginTop: 10,
  },
  calendar:{
    marginLeft:50,
    marginBottom: 20,
    marginTop: 10,
  },
  btn:{
    width: 80,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#FFD180",
  },
  btnADD:{
    width: 210,
    height: 60,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 100,
    justifyContent: "center",
    backgroundColor: "#FFD180",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text1: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  card:{
    width: 100,
    height: 40,
    marginBottom: 10,
  }
})
export default MyPet
