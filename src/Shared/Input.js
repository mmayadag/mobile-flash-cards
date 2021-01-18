import React from 'react';
import {
    Text, View,
} from 'react-native';

import { StyleSheet, TextInput } from 'react-native';

const Input = ({ title, ...props }) =>
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{title}</Text>
        <TextInput
            style={styles.textInput}
            {...props}
        />
    </View>;


const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 40,
        marginTop: 20,
    },
    label: {
        marginHorizontal: 16,
    },
    textInput: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        textAlign: 'left',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        color: "black",
        borderColor: "gray",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 8,
    }
})

export default Input;

