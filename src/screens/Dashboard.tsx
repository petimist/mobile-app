import React, { memo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { Navigation } from '../types';
import Background from '../components/Background';
import {StyleSheet, Text, View} from 'react-native';
import { Calculator } from 'react-native-calculator';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => (
  <Background>
      <View style={{ flex: 1, flexDirection: 'row' }}>
          <Calculator style={{ flex: 1, flexDirection: 'row' }} />
      </View>
    <Button mode="contained" color='#FF69B4' onPress={() => navigation.navigate('LoginScreen')}>
      Logout
    </Button>
  </Background>
);



export default memo(Dashboard);
