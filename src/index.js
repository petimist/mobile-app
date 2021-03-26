import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  Dashboard,
  Register,
} from './screens';

import PetScreen from './screens/PetScreen'
import PetInfoScreen from './screens/PetInfoScreen'
import addAppointment from './screens/addAppointment'
import appointmentInfo from './screens/appointmentInfo'
import editAppointment from './screens/editAppointment'

const Router = createStackNavigator(
  {
    LoginScreen,
    Dashboard,
    Register,
    PetScreen,
    PetInfoScreen,
    addAppointment,
    appointmentInfo,
    editAppointment
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);