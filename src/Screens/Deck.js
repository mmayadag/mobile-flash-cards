import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import { DeckItem, Button, DeleteButton } from '../Shared';

const Deck = ({ route, navigator }) => {
    let DeckTitle = route && route.params && route.params.title ? route.params.title : "undefined"

    let QuestionsCount = route.params.data.questions.length;

    return (
        <View style={styles.container}>
            <DeckItem title={DeckTitle} size={QuestionsCount} />
            <View>
                <Button secondary title="Add Card" style={{}}></Button>
                <Button title="Start Quiz"></Button>
                <DeleteButton />
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
