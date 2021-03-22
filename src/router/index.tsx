import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Homepage,
  LoginScreen,
  Dashboard,
    Register,
} from '../screens';

const Router = createStackNavigator(
  {
    Homepage,
    LoginScreen,
    Dashboard,
      Register,
  },
  {
    initialRouteName: 'Homepage',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
