import React, { memo } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { Navigation } from '../types';
import {Dimensions, Image, ImageBackground, StyleSheet, Text, View} from "react-native";

type Props = {
    navigation: Navigation;
};

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

const Homepage = ({ navigation }: Props) => {

    const toRegisterPressed = () => {
        navigation.navigate('Register')
    };

    const toLoginPressed = () => {
        navigation.navigate('LoginScreen')
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <ImageBackground source={require("../assets/circle.png")} style={styles.image2}>
                    <Image
                        style={styles.image_logo}
                        source={{ uri: "https://media.tenor.com/images/b6816283f39bdc3b46c80a122a603456/tenor.gif"}}
                    >
                    </Image>
                </ImageBackground>
                <Text style={styles.text}>Petimist</Text>
                <PaperButton mode="outlined" style={styles.btn_login } icon={require('../assets/round_login_black_18dp.png')} color="black" onPress={toLoginPressed}>
                    <Text style={{fontSize: 20}}> Login </Text>
                </PaperButton>
                <PaperButton mode="outlined" style={styles.btn_register} icon={require('../assets/round_create_black_18dp.png')} color="black"  onPress={toRegisterPressed}>
                    <Text style={{fontSize: 20}}> Register </Text>
                </PaperButton>
            </ImageBackground>
        </View>
    )
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: screenWidth,
        height: screenHeight,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight,
    },
    text: {
        color: "black",
        fontSize: 72,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    image_logo:{
        width: 200,
        height: 200,
        marginLeft: 40,
        marginTop: 20,
    },
    image2:{
        width: 280,
        height: 280,
    },
    btn_login:{
        width: 200,
        height: 60,
        marginTop: 20,
        borderRadius: 30,
        justifyContent: "center",
        backgroundColor: "#FFD180",
    },
    btn_register:{
        width: 200,
        height: 60,
        marginTop: 20,
        borderRadius: 30,
        justifyContent: "center",
        backgroundColor: "#FFD180",
    },
    btn_text:{
        fontSize: 20,
    }
});

export default memo(Homepage);
