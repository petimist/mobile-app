import React, { memo, useState } from 'react';
import TextInput from '../components/TextInput';
import { Navigation } from '../types';
import {Button as PaperButton, IconButton} from 'react-native-paper';
import {Dimensions, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import { emailValidator, passwordValidator } from '../core/utils';
import { registration } from '../services/auth.js';
import { Alert } from "react-native";

type Props = {
    navigation: Navigation;
};

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

const RegisterScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });

    const toLoginPressed = () => {
        navigation.navigate('LoginScreen')
    };

    const toHomePressed = () => {
        navigation.navigate('Homepage')
    };

    const _onRegisterPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const passwordConfirmError = confirmPassword.value !== password.value;

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        if (passwordConfirmError) {
            setPassword({ ...password, error: 'Password and confirm password do not match' });
            setConfirmPassword({ ...confirmPassword, error: 'Password and confirm password do not match' });
            return;
        }

        if (email.value && password.value) {
            await registration(email.value, password.value).then((res) => {
                if (res === 'auth/email-already-in-use'){
                    Alert.alert("Please use another email.");
                    // console.log("Please use another email.")
                }else{
                    Alert.alert("Successfully registered!");
                    // console.log("Successfully registered!")
                    navigation.navigate('LoginScreen');
                }
            })
        }


    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <IconButton
                    icon={require('../assets/baseline_west_black_18dp.png')}
                    size={30}
                    style={{marginRight: "80%", marginTop: "20%"}}
                    onPress={toHomePressed}
                >
                </IconButton>
                <ImageBackground source={require("../assets/circle.png")} style={styles.image2}>
                    <Image
                        style={styles.image_logo}
                        source={{ uri: "https://media.tenor.com/images/b6816283f39bdc3b46c80a122a603456/tenor.gif"}}
                    >
                    </Image>
                </ImageBackground>

                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25, marginTop: 20}}>Please Register</Text>

                <TextInput
                    label="email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={text => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    placeholder="Type your email address!"
                />

                <TextInput
                    label="password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    placeholder="Type your password!"
                    secureTextEntry
                />

                <TextInput
                    label="confirm password"
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={text => setConfirmPassword({ value: text, error: '' })}
                    error={!!confirmPassword.error}
                    errorText={confirmPassword.error}
                    placeholder="Type your password again!"
                    secureTextEntry
                />

                <PaperButton mode="contained" style={styles.btn_login} onPress={_onRegisterPressed}>
                    <Text style={styles.text2}> Submit </Text>
                </PaperButton>

                <PaperButton dark={false} mode="contained" style={styles.btn_back_to_login}
                             icon={require('../assets/baseline_west_black_18dp.png')}
                             color="black" onPress={toLoginPressed}>
                    <Text style={styles.text2}> Back to Login </Text>
                </PaperButton>

            </ImageBackground>
        </View>
    );
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

    image_logo:{
        width: 100,
        height: 100,
        marginLeft: 40,
        marginTop: 30,
    },

    image2:{
        width: 180,
        height: 180,
    },

    btn_login:{
        width: screenWidth * 0.75,
        height: 60,
        borderRadius: 30,
        marginTop: "4%",
        justifyContent: "center",
        backgroundColor: "#FFD180",
    },

    btn_back_to_login:{
        width: screenWidth * 0.75,
        height: 60,
        borderRadius: 30,
        marginTop: "4%",
        marginBottom: 90,
        justifyContent: "center",
        backgroundColor: "#FFD180",
    },

    text2:{
        fontSize: 20,
        color: "black",
    },
})
export default memo(RegisterScreen);
