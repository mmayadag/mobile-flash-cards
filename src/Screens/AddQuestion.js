import React, { useState } from 'react';
import {
    Text, TouchableOpacity, View, KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet } from 'react-native';

import Input from '../Shared/Input';
import Button from '../Shared/Button';
import Title from '../Shared/Title';

const Home = ({ route, navigation }) => {
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
                        }
                        }
                    />
                    <TouchableWithoutFeedback onPress={() => { NavigateToDecks(); }}>
                        <Text style={styles.cancel}>
                            Cancel
                        </Text>
                    </TouchableWithoutFeedback>
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
    cancel: {
        textAlign: 'center',
        padding: 10,
        marginTop: 10,
        alignSelf: 'stretch'
    }
})

export default Home;
