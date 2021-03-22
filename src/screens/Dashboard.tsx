import React, { memo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { Navigation } from '../types';
import Background from '../components/Background';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import { Calculator } from 'react-native-calculator';
import { loggingOut } from '../services/auth.js';
// import { loggingOut, currentUser } from '../services/auth.js';
import { Alert } from "react-native";

type Props = {
  navigation: Navigation;
};

const image = { uri:"https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg" };

const Dashboard = ({ navigation }: Props) => {
  // const response = currentUser();
  // Alert.alert(response);

  return (
      <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
              <Text style={{marginTop: 50, marginLeft: 135}}> This is dashboard</Text>
          </ImageBackground>
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
})

export default memo(Dashboard);
