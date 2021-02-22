import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Navigation } from '../types';
import Button from '../components/Button';
import {Text} from "react-native";

type Props = {
    navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {

    return (
        <Background>
            <Logo />

            <Text style={{ fontWeight: 'bold',color: 'hotpink', fontSize: 25}}>Please Register</Text>


            <TextInput
                label="Username"
                returnKeyType="next"
                autoCapitalize="sentences"
                textContentType="username"
                placeholder="Insert your username!"
                theme={{
                    colors: {
                        primary:'red',
                    }
                }}
            />

            <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholder="Insert your email address!"
                theme={{
                    colors: {
                        primary:'red',
                    }
                }}
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                placeholder="Insert your password!"
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
                placeholder="Insert your password!"
                secureTextEntry
                theme={{
                    colors: {
                        primary:'red',
                    }
                }}
            />

            <Button mode="contained" color='#FF69B4' onPress={() => navigation.navigate('LoginScreen')}>
                Logout
            </Button>
        </Background>
    );
};

export default memo(RegisterScreen);