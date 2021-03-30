import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PetIEditScreen from "../screens/PetIEditScreen";
import Appointment from "../screens/Appointment";
import AppointmentEditScreen from "../screens/AppointmentEditScreen";

import {
    Homepage,
  LoginScreen,
  MyPet,
  Register,
    Dashboard,
} from '../screens';

const Router = createStackNavigator(
  {
      Homepage,
    LoginScreen,
    MyPet,
    Register,
      Dashboard,
      Appointment,
      PetIEditScreen,
      AppointmentEditScreen,
  },
  {
    initialRouteName: 'Homepage',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
