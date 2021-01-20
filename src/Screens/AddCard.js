import React, { useState } from 'react';
import {
    View, KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet } from 'react-native';

import { Button, CancelButton, Input, Title } from '../Shared';
import { saveQuestion } from '../Storage/Store'

const AddCard = ({ route, navigation }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const clearForm = () => {
        setQuestion("");
        setAnswer("");
    }
    const NavigateToDecks = () => {
        createQuestion(question, answer);
        clearForm();
        navigation.navigate('Decks')
    }
    const createQuestion = async (q, a) => {
        await saveQuestion(q, a, title);
    };

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
