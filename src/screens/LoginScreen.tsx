import React, { memo, useState } from 'react';
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button as PaperButton, IconButton} from 'react-native-paper';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from '../types';
import { signIn } from '../services/auth.js';
import { Alert } from "react-native";

type Props = {
  navigation: Navigation;
};

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };


const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    if (email.value && password.value) {
      await signIn(email.value, password.value).then((res) => {
        if (res === 'auth/user-not-found') {
          Alert.alert("Email not found, please register!");
          // console.log("Email not found, please register.");
        } else if (res === 'auth/wrong-password'){
          Alert.alert("Password is wrong!");
        }
        else {
          // console.log(JSON.parse(res));
          navigation.navigate('Dashboard');
        }
      })
    }


  };

  const toHomePressed = () => {
    navigation.navigate('Homepage')
  };

  return (
      <ScrollView style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <IconButton
              icon={require('../assets/baseline_west_black_18dp.png')}
              size={30}
              style={{marginRight: "80%"}}
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
          />

          <TextInput
              label="password"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
          />

          <PaperButton mode="contained" style={styles.btn_login} onPress={_onLoginPressed}>
            <Text style={styles.text2}> Login </Text>
          </PaperButton>

          {/* TODO: Connect to google auth and facebook auth */}
          {/* <Text style={styles.text3}> ----------- or connected with ----------- </Text> */}

          {/* <PaperButton mode="contained" style={styles.btn_facebook} onPress={_onLoginPressed}>
            <Text style={styles.text_facebook}> Facebook </Text>
          </PaperButton>

          <PaperButton mode="contained" style={styles.btn_google} onPress={_onLoginPressed}>
            <Text style={styles.text_blue}>G</Text>
            <Text style={styles.text_red}>o</Text>
            <Text style={styles.text_yellow}>o</Text>
            <Text style={styles.text_blue}>g</Text>
            <Text style={styles.text_green}>l</Text>
            <Text style={styles.text_red}>e</Text>
          </PaperButton> */}

          <Image
              style={styles.image_heart}
              source={{uri: "https://diaryofsarita.files.wordpress.com/2015/01/01508-language2bseparator.png?w=1400"}}
          ></Image>
        </ImageBackground>

      </ScrollView>
  );
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column',
  },

  image_heart: {
    width: 300,
    height: "6%",
    marginLeft: "50%",
    marginRight: "50%",
    marginTop: "3%",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },

  text: {
    color: "black",
    fontSize: 72,
    fontWeight: "bold",
    textAlign: "center",
  },

  text2:{
    fontSize: 20,
    color: "black",
  },

  text3:{
    marginTop: 20,
    fontSize: 15,
    color: "black",
  },

  text_facebook:{
    marginTop: 20,
    fontSize: 18,
    color: "white",
  },

  text_blue:{
    marginTop: 20,
    fontSize: 18,
    color: "#4285f3",
  },

  text_red:{
    marginTop: 20,
    fontSize: 18,
    color: "#ea4435",
  },

  text_yellow:{
    marginTop: 20,
    fontSize: 18,
    color: "#fabd03",
  },

  text_green:{
    marginTop: 20,
    fontSize: 18,
    color: "#33a852",
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
    marginTop: 10,
  },

  btn_login:{
    width: screenWidth * 0.75,
    height: 60,
    borderRadius: 30,
    marginTop: "4%",
    justifyContent: "center",
    backgroundColor: "#FFD180",
  },

  btn_facebook:{
    width: screenWidth * 0.75,
    height: 60,
    borderRadius: 30,
    marginTop: "4%",
    justifyContent: "center",
    backgroundColor: "#076fe6",
  },

  btn_google:{
    width: screenWidth * 0.75,
    height: 60,
    borderRadius: 30,
    marginTop: "4%",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
