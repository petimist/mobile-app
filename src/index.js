import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  Dashboard,
  Register,
} from './screens';

import PetScreen from './screens/PetScreen'
import PetInfoScreen from './screens/PetInfoScreen'

const Router = createStackNavigator(
  {
    LoginScreen,
    Dashboard,
    Register,
    PetScreen,
    PetInfoScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);