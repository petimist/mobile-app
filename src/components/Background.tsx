import React, { memo } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView, View,
} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => (
  <View
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </View>
);
// abc
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);
