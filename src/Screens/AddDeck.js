import React, { useState } from 'react';
import {
    View, KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet } from 'react-native';

import { Button, CancelButton, Input, Title } from '../Shared';

const AddDeck = ({ route, navigation }) => {
    const [question, setQuestion] = useState("");
    const clearForm = () => {
        setQuestion("");
    }
    const NavigateToDecks = () => {
        clearForm();
        navigation.navigate('Decks')
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Title>What is title of your new deck ?</Title>
                    <Input
                        title="Question"
                        onChangeText={(text) => { setQuestion(text) }}
                        placeholder="question"
                        value={question}
                        autoFocus
                    />
                    <Button
                        title="Submit"
                        onPress={() => {
                            // TODO: Save To async store
                            console.log({ question })
                            NavigateToDecks();
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
