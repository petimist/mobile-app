import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  Dashboard,
  Register,
} from './screens';

import PetScreen from './screens/PetScreen'

const Router = createStackNavigator(
  {
    LoginScreen,
    Dashboard,
    Register,
    PetScreen
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);