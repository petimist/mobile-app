import React, { Component } from 'react'
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
    Button,
    ImageBackground,
    Image
} from 'react-native'
import TextInputD from '../components/TextInputDialoct';
import { db } from '../plugins/firebase'
import { Button as PaperButton }from 'react-native-paper'
import {currentUser} from '../services/auth'


const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

class PetIEditScreen extends Component {
    constructor() {
        super();

        this.userRef = db.collection("users").doc(currentUser().uid)

        this.state = {
            isLoading: true,
            name: '',
            birthday: '',
            species: '',
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
        this.userRef.collection('pets').doc(this.getId()).set({
            name: this.state.name,
            birthday: this.state.birthday,
            species: this.state.species,
        })
        .then(() => {
            console.log("Document successfully written!");
            this.props.navigation.navigate('MyPet')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    deletePet = () => {
        this.userRef.collection('pets').doc(this.getId()).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.navigation.navigate('MyPet')
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    componentDidMount() {
        var docRef = this.userRef.collection('pets').doc(this.getId());
        docRef.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                this.setState({
                    name: doc.data().name,
                    birthday: doc.data().birthday,
                    species: doc.data().species,
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
                    <Text style={styles.text}>Please Edit Your Pets!</Text>
                    <TextInputD
                        label="name"
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    ></TextInputD>
                    <TextInputD
                        label="birthday"
                        value={this.state.birthday}
                        onChangeText={(val) => this.inputValueUpdate(val, 'birthday')}
                    ></TextInputD>
                    <TextInputD
                        label="species"
                        value={this.state.species}
                        onChangeText={(val) => this.inputValueUpdate(val, 'species')}
                    ></TextInputD>
                    <PaperButton style={styles.btnEdit} onPress={this.saveEdit}>
                        <Text style={styles.text1}> confirm edit </Text>
                    </PaperButton>
                    <PaperButton style={styles.btnEdit} onPress={this.deletePet}>
                        <Text style={styles.text1}> delete you pet  (T T)</Text>
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
        width: 280,
        height: 280,
    },
    text: {
        color: "black",
        fontSize: 32,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    image_logo:{
        width: 200,
        height: 200,
        marginLeft: 30,
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

export default PetIEditScreen
