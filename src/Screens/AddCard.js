import React, { useState } from 'react';
import {
    View, KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet } from 'react-native';

import { Button, CancelButton, Input, Title } from '../Shared';

const AddCard = ({ route, navigation }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const clearForm = () => {
        setQuestion("");
        setAnswer("");
    }
    const NavigateToDecks = () => {
        clearForm();
        navigation.navigate('Decks')
    }
    let title = route.params.title ?? "undefined"
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Title>Deck : {title}</Title>
                    <Input
                        title="Question"
                        onChangeText={(text) => { setQuestion(text) }}
                        placeholder="question"
                        value={question}
                        autoFocus
                    />
                    <Input
                        title="Answer"
                        onChangeText={(text) => { setAnswer(text) }}
                        placeholder="answer"
                        value={answer}
                    />
                    <Button
                        title="Submit"
                        onPress={() => {
                            // TODO: Save To async store
                            console.log({ question, answer, title })
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
    },
})

export default AddCard;
