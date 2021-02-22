import React, { memo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { Navigation } from '../types';
import Background from '../components/Background';
import {StyleSheet, Text, View} from 'react-native';
import { Calculator } from 'react-native-calculator';
import { loggingOut } from '../services/auth.js';
// import { loggingOut, currentUser } from '../services/auth.js';
import { Alert } from "react-native";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  // const response = currentUser();
  // Alert.alert(response);

  return (
    <Background>
      <Button mode="outlined" onPress={() => {
        loggingOut().then(() => {
          navigation.navigate('LoginScreen')
        })
      }}>
        Logout
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
