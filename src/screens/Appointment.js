import React, {Component, memo, useState} from 'react'
import {Button, Button as PaperButton, Dialog, Paragraph, Portal, Card, Title} from 'react-native-paper';
import {ImageBackground, StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput, Alert} from 'react-native'
import { db } from '../plugins/firebase'
import {currentUser} from '../services/auth'
import { Appbar } from 'react-native-paper';
import TextInputD from '../components/TextInputDialoct';
import { List } from 'react-native-paper';


const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

class Appointment extends Component {
    constructor() {
        super();
        this.userRef = db.collection("users").doc(currentUser().uid)
        this.state = {
            date: '',
            time: '',
            vet: '',
            todo: '',
            isLoading: false,
            visible: false,
            appArr: [],
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

    createAppointment = () => {
        this.setState({
            isLoading: true
        })
        // Add a new document with a generated id.
        this.userRef.collection('appointment').add({
            date: this.state.date,
            time: this.state.time,
            vet: this.state.vet,
            todo: this.state.todo,

        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.setState({
                    date: '',
                    time: '',
                    vet: '',
                    todo: '',
                    isLoading: false
                });
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                this.setState({
                    date: '',
                    time: '',
                    vet: '',
                    todo: '',
                    isLoading: false
                });
            });
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
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.textHeader}> These are your appointments: </Text>
                    <View style={styles.view}>
                        <ScrollView>
                            { this.state.appArr.map((item, key) => (
                                <List.Accordion
                                    style={{backgroundColor:"#FFD180",borderWidth: 3, width:330}}
                                    title={item.todo}
                                    theme={{ colors: { text: 'black', primary: 'black' } }}
                                >
                                    <List.Item style={{backgroundColor:"white", borderWidth: 1, width:330}} title={"Todo: " + item.todo} ></List.Item>
                                    <List.Item style={{backgroundColor:"white", borderWidth: 1, width:330}} title={"Date: " + item.date} ></List.Item>
                                    <List.Item style={{backgroundColor:"white", borderWidth: 1, width:330}} title={"Time: " + item.time} ></List.Item>
                                    <List.Item style={{backgroundColor:"white", borderWidth: 1, marginBottom:5, width:330}} title={"Vet: " + item.vet} ></List.Item>
                                    <Button
                                        style={{textColor:"black", borderWidth: 1}}
                                        onPress={() => this.props.navigation.navigate('AppointmentEditScreen', {id: item.key})}>
                                        <Text style={{color:'black'}}> EDIT </Text>
                                    </Button>
                                </List.Accordion>
                                )
                            )}
                        </ScrollView>
                    </View>
                    <PaperButton mode="outline" style={styles.btnADD} icon="plus" color="black" onPress={this.showDialog}>
                        <Text style={styles.text}> ADD APPOINTMENT </Text>
                    </PaperButton>

                    <Portal>
                        <Dialog style={{backgroundColor:"#ffe7bb"}} visible={this.state.visible} onDismiss={this.hideDialog}>
                            <Dialog.Title>Please fill out the form below</Dialog.Title>
                            <Dialog.Content>
                                <TextInputD
                                    label="Todo"
                                    value={this.state.todo}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'todo')}
                                >
                                </TextInputD>
                                <TextInputD
                                    label="Date"
                                    value={this.state.date}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'date')}
                                >
                                </TextInputD>
                                <TextInputD
                                    label='Time'
                                    value={this.state.time}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'time')}
                                >
                                </TextInputD>
                                <TextInputD
                                    label="Vet"
                                    value={this.state.vet}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'vet')}
                                >
                                </TextInputD>
                            </Dialog.Content>
                            <Dialog.Actions>

                                <PaperButton mode='outline' style={styles.btn} onPress={this.createAppointment} >
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
        width: 250,
        height: 60,
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
    },
    textHeader: {
        color: "black",
        fontSize: 22,
        marginTop: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
})
export default Appointment
