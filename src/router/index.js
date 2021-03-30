import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PetIEditScreen from "../screens/PetIEditScreen";

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
      PetInfoScreen: PetIEditScreen
  },
  {
    initialRouteName: 'MyPet',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
