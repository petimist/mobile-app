import React, {Component, memo, useState} from 'react'
import {Button, Button as PaperButton, Dialog, Paragraph, Portal, Card, Title} from 'react-native-paper';
import {ImageBackground, StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput, Alert} from 'react-native'
import { db } from '../plugins/firebase'
import {currentUser} from '../services/auth'
import { Appbar } from 'react-native-paper';
import TextInputD from '../components/TextInputDialoct';
import { List } from 'react-native-paper';


const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

class MyPet extends Component {
  constructor() {
    super();
    this.userRef = db.collection("users").doc(currentUser().uid)
    this.state = {
      name: "",
      birthday: '',
      species: '',
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
          birthday: '',
          species: '',
          isLoading: false
        });
        this.hideDialog()
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          name: '',
          birthday: '',
          species: '',
          isLoading: false
        });
      });
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
      const { birthday } = res.data();
      const { species } = res.data();
      petArr.push({
        key: res.id,
        res,
        name,
        birthday,
        species,
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
            <View style={styles.view}>
            <ScrollView>
              { this.state.petArr.map((pet, key) => (
                      // <Card style={styles.card} icon="dog" onPress={() => this.props.navigation.navigate('PetIEditScreen', {id: pet.key})}>
                        <List.Accordion
                            style={{backgroundColor:"#FFD180", borderRadius:30, marginBottom:10, borderWidth: 3, width:330}}
                            title={pet.name}
                            theme={{ colors: { text: 'black', primary: 'black' } }}
                        >
                          <List.Item style={{backgroundColor:"white", borderRadius:20, borderWidth: 1, marginBottom:5, width:330}} title={"Pet's name: " + pet.name} ></List.Item>
                          <List.Item style={{backgroundColor:"white", borderRadius:20, borderWidth: 1, marginBottom:5, width:330}} title={"Pet's birthday: " + pet.birthday} ></List.Item>
                          <List.Item style={{backgroundColor:"white", borderRadius:20, borderWidth: 1, marginBottom:5, width:330}} title={"Pet's species: " + pet.species} ></List.Item>
                          <Button
                              style={{textColor:"black", borderWidth: 1}}
                              onPress={() => this.props.navigation.navigate('PetInfoScreen', {id: pet.key})}>
                            <Text style={{color:'black'}}> EDIT </Text>
                          </Button>
                        </List.Accordion>
                  )
              )}
            </ScrollView>

            </View>

            <PaperButton mode="outline" style={styles.btnADD} icon="plus" color="black" onPress={this.showDialog}>
              <Text style={styles.text}> ADD PET </Text>
            </PaperButton>

            <Portal style={{justifyContent: "center"}}>
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
                <PaperButton style={styles.btn1} onPress={this.hideDialog}>
                  <Text style={styles.text1}> cancel </Text>
                </PaperButton>

              </Dialog.Actions>
            </Dialog>
            </Portal>

            <Appbar style={styles.bottom}>
              <Appbar.Action style={styles.dog} icon="dog" size={40} onPress={() => this.props.navigation.navigate('MyPet')} />

              <Appbar.Action style={styles.home} icon="home" size={40} onPress={() => this.props.navigation.navigate('Dashboard')}/>

              <Appbar.Action style={styles.calendar} icon="calendar" size={40} onPress={() => this.props.navigation.navigate('Appointment')} />
            </Appbar>

          </ImageBackground>
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
    justifyContent: "center",
    alignItems: "center"
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
    borderColor: "black",
    borderWidth: 2,
  },
  btn1:{
    width: 130,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#FFD180",
    borderColor: "black",
    borderWidth: 2,
  },
  btnADD:{
    width: 210,
    height: 60,
    borderRadius: 30,
    marginBottom: 60,
    justifyContent: "center",
    backgroundColor: "#FFD180",
    borderWidth: 2,
    borderColor: "black",
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
  text2: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 25,
  },
  card:{
    width: 325,
    height: 80,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 50,
    alignItems: "center",
    backgroundColor: "#ffe7bb",
    borderRadius: 10,
  },
  view:{
    marginTop: 40,
    height: 550,
    width: 350,
    marginLeft: 30,
  }
})
export default memo(MyPet)
