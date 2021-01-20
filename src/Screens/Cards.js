import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button as RNButton, FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import { DeckItem, Button, DeleteButton } from '../Shared';
import { getDeck, deleteDeck } from '../Storage/Store';
import { MaterialIcons } from '@expo/vector-icons';

const RenderItem = ({ item: { question, answer }, navigation, border }) => (
    <View style={((border === true) ? { borderBottomWidth: 1, borderBottomColor: 'lightgray' } : '')}>
        <TouchableOpacity onPress={async () => {
            navigation.navigate('Deck', {
                title: title,
            })
        }}>
            <View style={{
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }} onPress={() => { }}>
                <Text style={{ marginBottom: 10 }}>Q: {question}</Text>
                <Text style={{ marginBottom: 10 }}>A: {answer}</Text>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    backgroundColor: "white",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: "white"
                }}
                    onPress={() => {
                        navigation.navigate('Add Card', { title })
                    }}
                >
                    <Text style={{
                        color: "red"
                    }}>Delete </Text>
                    <MaterialIcons name="delete-forever" size={24} color="red" /></TouchableOpacity>
            </View>
        </TouchableOpacity>
    </View >
);

const Cards = ({ route, navigation }) => {
    let title = route && route.params && route.params.title ? route.params.title : "undefined"
    const [questions, setQuestions] = useState([]);

    /*const readDeckData = async () => {
        const deck = await getDeck(title);
        setQuestions(deck.questions);
    };

    const deleteAndGoDecks = async () => {
        await deleteDeck(title)
        navigation.navigate('Decks')
    }
    */
    useEffect(() => {
        if (route && route.params && route.params.questions) {
            console.log({ questions: route.params.questions })
            setQuestions(route.params.questions);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            { questions && questions.length > 0 ?
                <FlatList
                    data={questions}
                    renderItem={({ item, index }) => <RenderItem
                        border={index !== questions.length - 1}
                        item={item}
                        navigation={navigation} />}
                    keyExtractor={item => item.question}
                    extraData={questions}
                />
                :
                <View style={{ justifyContent: 'center', flex: 1, }}>
                    <Text style={{ textAlign: 'center' }}> There isn't any Question in {title} deck.</Text>
                    <Button title="Add new Questions" onPress={() => {
                        navigation.navigate('Add Card', { title })
                    }} />
                </View>
            }
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop: StatusBar.currentHeight || 0,
    }
});
export default Cards;
