import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInputDialoct = ({ errorText, ...props }: Props) => (
    <View style={styles.container}>
        <Input
            style={styles.input}
            selectionColor="black"
            underlineColor="black"
            mode="flat"
            theme={{ colors: { text: 'black', primary: '#FF7878' } }}
            {...props}
        />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: null,
    },
    error: {
        marginLeft: 57,
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default memo(TextInputDialoct);
