import React, { memo } from 'react';
import { Navigation } from '../types';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import { Appbar } from 'react-native-paper';


type Props = {
    navigation: Navigation;
};

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

const Appointment = ({ navigation }: Props) => {

    const toHomePressed = () => {
        navigation.navigate('Dashboard')
    };

    const toMyPet = () => {
        navigation.navigate('MyPet')
    }

    const toAppointment = () => {
        navigation.navigate('Appointment')
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={{marginTop: 50, marginLeft: 135}}> This is Appointment</Text>
            </ImageBackground>
            <Appbar style={styles.bottom}>
                <Appbar.Action style={styles.dog} icon="dog"  size={40} onPress={toMyPet} />

                <Appbar.Action style={styles.home} icon="home" size={40} onPress={toHomePressed}/>

                <Appbar.Action style={styles.calendar} icon="calendar" size={40} onPress={toAppointment} />
            </Appbar>
        </View>
    )
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        flexDirection: "column",
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
})

export default memo(Appointment);
