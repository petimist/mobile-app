import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, TextInput } from 'react-native'
import { db } from '../plugins/firebase'
import {currentUser} from '../services/auth'


class editAppointment extends Component {
    constructor() {
        super();

        this.userRef = db.collection("users").doc(currentUser().uid)

        this.state = {
            isLoading: true,
            name: '',
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
            name: this.state.name,
        })
        .then(() => {
            console.log("Document successfully written!");
            this.props.navigation.navigate('appointmentInfo')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    deleteAppointment = () => {
        this.userRef.collection('appointment').doc(this.getId()).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.navigation.navigate('appointmentInfo')
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
                    name: doc.data().name,
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
                <Text>name: </Text>
                <TextInput
                    label="name"
                    value={this.state.name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                ></TextInput>
                <Button title='confirm edit' onPress={this.saveEdit}></Button>
                <Button title='delete' onPress={this.deleteAppointment}></Button>
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

export default editAppointment