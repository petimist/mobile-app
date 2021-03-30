import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src/router';
import { theme } from './src/core/theme';
import './src/plugins/firebase'

const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;