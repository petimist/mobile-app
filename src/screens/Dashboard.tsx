import React, { memo } from 'react';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import Background from '../components/Background';
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
