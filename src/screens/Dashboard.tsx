import React, { memo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { Navigation } from '../types';
import Background from '../components/Background';
<<<<<<< HEAD
import {StyleSheet, Text, View} from 'react-native';
import { Calculator } from 'react-native-calculator';
=======
import { loggingOut } from '../services/auth.js';
// import { loggingOut, currentUser } from '../services/auth.js';
import { Alert } from "react-native";
>>>>>>> 91829c0a58e771adedf40414c7820b1f8a5c1b8d

type Props = {
  navigation: Navigation;
};

<<<<<<< HEAD
const Dashboard = ({ navigation }: Props) => (
  <Background>
      <View style={{ flex: 1, flexDirection: 'row' }}>
          <Calculator style={{ flex: 1, flexDirection: 'row' }} />
      </View>
    <Button mode="contained" color='#FF69B4' onPress={() => navigation.navigate('LoginScreen')}>
      Logout
=======
const Dashboard = ({ navigation }: Props) => {
  // const response = currentUser();
  // Alert.alert(response);

  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
    </Paragraph>
      <Button mode="outlined" onPress={() => {
        loggingOut().then(() => {
          navigation.navigate('LoginScreen')
        })
      }}>
        Logout
>>>>>>> 91829c0a58e771adedf40414c7820b1f8a5c1b8d
    </Button>
    {/* <Button mode="outlined" onPress={() => {
        currentUser()
      }}>
        My profile
    </Button> */}
    </Background>
  )
};



export default memo(Dashboard);
