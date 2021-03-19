import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  Dashboard,
    Register,
} from './screens';

const Router = createStackNavigator(
  {
    LoginScreen,
    Dashboard,
      Register,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
