import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
//import { StyleSheet } from 'react-native';

import { DeckItem } from '../Shared';

const DATA1 = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

const DATA = Object.keys(DATA1).map(i => ({ title: i, size: DATA1[i].questions.length.toString() }))

const Item = ({ title, size, onPress }) =>
    <DeckItem title={title} size={size} onPress={onPress} />;

const RenderItem = ({ item: { title, size }, navigation }) => (
    <Item title={title} size={size} onPress={() => {
        navigation.navigate('Deck', {
            title: title,
            data: DATA1[title]
        })
    }
    } />
);

const Page = ({ navigation, title }) => <SafeAreaView style={styles.container}>
    <FlatList
        data={DATA}
        renderItem={(obj) => <RenderItem item={obj.item} navigation={navigation} />}
        keyExtractor={item => item.title}
    />
</SafeAreaView>;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

export default Page;
