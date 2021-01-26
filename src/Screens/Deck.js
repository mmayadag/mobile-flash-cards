import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import { DeckItem, Button, DeleteButton } from '../Shared';
import { getDeck, deleteDeck } from '../Storage/Store';

const Deck = ({ route, navigation }) => {
    let DeckTitle = route && route.params && route.params.title ? route.params.title : "undefined"

    const [QuestionsCount, setQuestionsCount] = useState(0);
    const [questions, setQuestions] = useState();

    const [deck, setDeck] = useState();
    const readDeckData = async () => {
        const _deck = await getDeck(DeckTitle);
        setDeck(_deck);
        setQuestions(_deck.questions);
        setQuestionsCount(_deck.questions.length);
    };

    const deleteAndGoDecks = async () => {
        await deleteDeck(DeckTitle)
        navigation.navigate('Decks')
    }
    navigation.addListener('focus', () => { readDeckData() })

    // TODO: Fix here

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={async () => {
                navigation.navigate('Cards', {
                    title: DeckTitle
                })
            }}>
                <DeckItem title={DeckTitle} size={QuestionsCount} />
            </TouchableOpacity>
            <View>
                <Button secondary title="Add Card" onPress={() => {
                    navigation.navigate('Add Card', {
                        title: DeckTitle
                    })
                }}></Button>
                <Button title="Start Quiz"
                    onPress={() => {
                        navigation.navigate('Quiz', {
                            title: DeckTitle
                        })
                    }}></Button>
                <DeleteButton onPress={async () => {
                    await deleteAndGoDecks();
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop: StatusBar.currentHeight || 0,
    }
});
export default Deck;
