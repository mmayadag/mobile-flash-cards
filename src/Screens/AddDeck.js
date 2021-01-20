import React, { useState } from 'react';
import {
    View, KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet } from 'react-native';

import { Button, CancelButton, Input, Title } from '../Shared';

import { createDeckObject } from '../Storage/Store';

const AddDeck = ({ route, navigation }) => {
    const [question, setQuestion] = useState("");

    const clearForm = () => {
        setQuestion("");
    }
    const NavigateToDecks = () => {
        clearForm();
        navigation.navigate('Decks')
    }

    const writeItemToStorage = async deckTitle => {
        await createDeckObject(deckTitle);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Title>What is title of your new deck ?</Title>
                    <Input
                        onChangeText={(text) => { setQuestion(text) }}
                        placeholder="title"
                        value={question}
                        autoFocus
                    />
                    <Button
                        title="Submit"
                        onPress={() => {
                            if (question && question.length > 0) {
                                writeItemToStorage(question);
                                NavigateToDecks();
                            }
                        }}
                    />
                    <CancelButton onPress={() => { NavigateToDecks(); }} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default AddDeck;
