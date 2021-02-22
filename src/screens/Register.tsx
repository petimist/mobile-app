import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Navigation } from '../types';
import Button from '../components/Button';
import {Text} from "react-native";
import { emailValidator, passwordValidator } from '../core/utils';
import { registration } from '../services/auth.js';
import { Alert } from "react-native";

type Props = {
    navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
  
    const _onRegisterPressed = async () => {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      const passwordConfirmError = password.value === password.value;

      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      if (email.value && password.value) {
        await registration(email.value, password.value).then((res) => {
          if (res === 'auth/user-not-found') {
            Alert.alert("Email not found, please register.");
            // console.log("Email not found, please register.");
          } else {
            // console.log(JSON.parse(res));
            navigation.navigate('Dashboard');
          }
        })
      }
  
  
    };

    return (
        <Background>
            <Logo />

            <Text style={{ fontWeight: 'bold',color: 'hotpink', fontSize: 25}}>Please Register</Text>

            <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholder="Type your email address!"
                theme={{
                    colors: {
                        primary:'red',
                    }
                }}
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                placeholder="Type your password!"
                secureTextEntry
                theme={{
                    colors: {
                        primary:'red',
                    }
                }}
            />

            <TextInput
                label="confirmPassword"
                returnKeyType="done"
                placeholder="Type your password again!"
                secureTextEntry
                theme={{
                    colors: {
                        primary:'red',
                    }
                }}
            />

            <Button mode="contained" color='#FF69B4' onPress={_onRegisterPressed}>
                Confirm
            </Button>
            <Button mode="contained" color='#FF69B4' onPress={() => navigation.navigate('LoginScreen')}>
                Already has an account
            </Button>
        </Background>
    );
};

export default memo(RegisterScreen);