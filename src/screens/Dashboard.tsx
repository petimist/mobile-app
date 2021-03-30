import React, { memo } from 'react';
import { Navigation } from '../types';
import {Button, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Appbar, Button as PaperButton, Dialog, IconButton, Paragraph, Portal} from 'react-native-paper';
import {Icon} from "react-native-paper/lib/typescript/components/List/List";
import {loggingOut} from "../services/auth";

type Props = {
  navigation: Navigation;
};

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

const Dashboard = ({ navigation }: Props) => {
  // const response = currentUser();
  // Alert.alert(response);

    const toHomePressed = () => {
        navigation.navigate('Dashboard')
    };

    const toMyPet = () => {
        navigation.navigate('MyPet')
    }

    const toAppointment = () => {
        navigation.navigate('Appointment')
    }

    const signOut = () => {
        loggingOut().then(() => {
            navigation.navigate('Homepage')
        })
    }



  return (
      <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
              <Text style={styles.text}>Welcome to Petimist!</Text>
              <Text style={styles.text1}>
                  ..... There are three options for you .....
              </Text>
              <Text style={styles.text2}> 1. You can click on the dog's icon to navigate to your pets. </Text>
              <Text style={styles.text2}> 2. You can click on the calendar icon to navigate to your appointment. </Text>
              <Text style={styles.text2}> 3. You can click on the logout button to logout. </Text>

              <PaperButton mode="outlined" style={styles.btn_logout} icon={require('../assets/round_create_black_18dp.png')} color="black"  onPress={signOut}>
                  <Text style={{fontSize: 20}}> logout </Text>
              </PaperButton>

              <Image
                  style={styles.image_heart}
                  source={{uri: "https://diaryofsarita.files.wordpress.com/2015/01/01508-language2bseparator.png?w=1400"}}
              ></Image>

              <Image
                  style={{height: 100, width: 450, marginBottom: 20,}}
                  source={require('../assets/DogRuning.gif')}
              >
              </Image>

              <Appbar style={styles.bottom}>
                  <Appbar.Action style={styles.dog} icon="dog"  size={40} onPress={toMyPet} />

                  <Appbar.Action style={styles.home} icon="home" size={40} onPress={toHomePressed}/>

                  <Appbar.Action style={styles.calendar} icon="calendar" size={40} onPress={toAppointment} />
              </Appbar>

          </ImageBackground>

      </View>
  )
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
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
    text: {
        color: "black",
        fontSize: 52,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    text1: {
        color: "black",
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    text2: {
        color: "black",
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        marginTop: 20,
    },
    btn_logout:{
        width: 200,
        height: 60,
        marginTop: 20,
        borderRadius: 30,
        justifyContent: "center",
        backgroundColor: "#FFD180",
        borderColor: "black",
        borderWidth: 2,
    },
    image_heart: {
        width: 300,
        height: 100,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
    },
})

export default memo(Dashboard);
