import React, { memo } from 'react';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import Background from '../components/Background';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project. HELLO BORS
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
      Logout
    </Button>
  </Background>
);



export default memo(Dashboard);
