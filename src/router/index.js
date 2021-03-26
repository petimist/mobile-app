import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PetInfoScreen from "../screens/PetInfoScreen";

import {
    Homepage,
  LoginScreen,
  MyPet,
  Register,
    Dashboard,
    Appointment,
} from '../screens';

const Router = createStackNavigator(
  {
      Homepage,
    LoginScreen,
    MyPet,
    Register,
      Dashboard,
      Appointment,
      PetInfoScreen
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
