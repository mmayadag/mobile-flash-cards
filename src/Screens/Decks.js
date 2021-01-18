import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
//import { StyleSheet } from 'react-native';

import Title from '../Shared/Title';
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

const Item = ({ title, size, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Title>{title}</Title>
        <Text style={styles.subTitle}>{size > 0 ? size + " card" + (size > 1 ? "s" : "") : "no cards"}</Text>
    </TouchableOpacity>
);

const RenderItem = ({ item: { title, size }, navigation }) => (
    <Item title={title} size={size} onPress={() => {
        navigation.navigate('AddQuestion', {
            title: title
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
    },
    title: {
        fontSize: 32,
    },
    subTitle: {
        paddingTop: 10,
        fontSize: 16,
    }
});

export default Page;
