import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    Text,
    Button,
    TextInput,
    ImageBackground,
    Image
} from 'react-native'
import { db } from '../plugins/firebase'
import {currentUser} from '../services/auth'
import TextInputD from "../components/TextInputDialoct";
import {Button as PaperButton} from "react-native-paper";

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

class editAppointment extends Component {
    constructor() {
        super();
        this.userRef = db.collection("users").doc(currentUser().uid)
        this.state = {
            isLoading: true,
            date: '',
            time: '',
            vet: '',
            todo: '',
        }

    }

    getId = () => {
        return this.props.navigation.getParam('id')
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    saveEdit = () => {
        this.userRef.collection('appointment').doc(this.getId()).set({
            date: this.state.date,
            time: this.state.time,
            vet: this.state.vet,
            todo: this.state.todo,
        })
            .then(() => {
                console.log("Document successfully written!");
                this.props.navigation.navigate('Appointment')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    deleteAppointment = () => {
        this.userRef.collection('appointment').doc(this.getId()).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.navigation.navigate('Appointment')
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    componentDidMount() {
        var docRef = this.userRef.collection('appointment').doc(this.getId());
        docRef.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                this.setState({
                    date: doc.data().date,
                    time: doc.data().time,
                    vet: doc.data().vet,
                    todo: doc.data().todo,
                    isLoading: false
                })
            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View >
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <ImageBackground source={require("../assets/circle.png")} style={styles.image2}>
                        <Image
                            style={styles.image_logo}
                            source={{ uri: "https://media.tenor.com/images/dc7bb4a267b7ed34ac5d77fa0e47ec64/tenor.gif"}}
                        >
                        </Image>
                    </ImageBackground>
                    <Text style={styles.text}>Please Edit Your Appointment!</Text>
                    <TextInputD
                        label="Todo"
                        value={this.state.todo}
                        onChangeText={(val) => this.inputValueUpdate(val, 'todo')}
                    ></TextInputD>
                    <TextInputD
                        label="Date"
                        value={this.state.date}
                        onChangeText={(val) => this.inputValueUpdate(val, 'date')}
                    ></TextInputD>
                    <TextInputD
                        label="Time"
                        value={this.state.time}
                        onChangeText={(val) => this.inputValueUpdate(val, 'time')}
                    ></TextInputD>
                    <TextInputD
                        label="Vet"
                        value={this.state.vet}
                        onChangeText={(val) => this.inputValueUpdate(val, 'vet')}
                    ></TextInputD>
                    <PaperButton style={styles.btnEdit} onPress={this.saveEdit}>
                        <Text style={styles.text1}> confirm edit </Text>
                    </PaperButton>
                    <PaperButton style={styles.btnEdit} onPress={this.deleteAppointment}>
                        <Text style={styles.text1}> delete you appointment (T T)</Text>
                    </PaperButton>
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
        alignItems: 'center',
    },
    image2:{
        width: 180,
        height: 180,
    },
    text: {
        color: "black",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    image_logo:{
        width: 120,
        height: 120,
        marginLeft: 23,
        marginTop: 20,
    },
    btnEdit:{
        width: 210,
        height: 60,
        borderRadius: 30,
        marginTop: 20,
        justifyContent: "center",
        backgroundColor: "#FFD180",
        borderWidth: 2,
        borderColor: "black",
    },
    text1: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default editAppointment
