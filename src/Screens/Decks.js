import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import { getDecks } from '../Storage/Store';

import { DeckItem, Button } from '../Shared';

const Item = ({ title, size, onPress }) =>
    <DeckItem title={title} size={size} onPress={onPress} />;

const RenderItem = ({ item: { title, size }, navigation, border }) => (
    <View style={((border === true) ? { borderBottomWidth: 1, borderBottomColor: 'lightgray' } : '')}>
        <Item title={title} size={size} onPress={() => {
            navigation.navigate('Deck', {
                title: title,
            })
        }
        } />
    </View >
);

const Page = ({ navigation, title }) => {
    const [decks, setDecks] = useState();

    const readItemFromStorage = async () => {
        const decksData = await getDecks();
        if (decksData) {
            let decks_list = Object.keys(decksData).map(i => ({ title: i, size: decksData[i].questions.length.toString() }))
            setDecks(decks_list);
        }
    };

    // TODO: fix memory leak
    useEffect(() => {
        readItemFromStorage();
    });

    return (<SafeAreaView style={styles.container}>
        { decks && decks.length > 0 ?
            <FlatList
                data={decks}
                renderItem={({ item, index }) => <RenderItem
                    border={index !== decks.length - 1}
                    item={item}
                    navigation={navigation} />}
                keyExtractor={item => item.title}
                extraData={decks}
            />
            :
            <View style={{ justifyContent: 'center', flex: 1, }}>
                <Text style={{ textAlign: 'center' }}> No Deck found</Text>
                <Button title="Create Deck" onPress={() => {
                    navigation.navigate('Add Deck')
                }} />
            </View>
        }
    </SafeAreaView>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
});

export default Page;
