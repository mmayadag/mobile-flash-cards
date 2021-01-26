import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, Text, View, StyleSheet, FlatList, StatusBar,
} from 'react-native';
import { getDecks } from '../Storage/Store';

import { DeckItem, Button } from '../Shared';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

const Item = ({ title, size, onPress }) => <DeckItem title={title} size={size} onPress={onPress} />;

Item.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  onPress: PropTypes.func,
};

Item.defaultProps = {
  title: '',
  onPress: () => { },
  size: '',
};

const RenderItem = ({ item: { title, size }, navigation, border }) => (
  <View style={((border === true) ? { borderBottomWidth: 1, borderBottomColor: 'lightgray' } : '')}>
    <Item
      title={title}
      size={size}
      onPress={() => {
        navigation.navigate('Deck', {
          title,
        });
      }}
    />
  </View>
);

RenderItem.propTypes = {
  item: PropTypes.shape({ title: PropTypes.string, size: PropTypes.string }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  border: PropTypes.bool,
};

RenderItem.defaultProps = {
  item: { question: '', answer: '' },
  border: true,
};

const Decks = ({ navigation }) => {
  const [decks, setDecks] = useState();

  const readItemFromStorage = async () => {
    const decksData = await getDecks();
    if (decksData) {
      const decksList = Object.keys(decksData).map((i) => ({
        title: i, size: decksData[i].questions.length.toString(),
      }));
      setDecks(decksList);
    }
  };

  //  navigation.addListener('focus', () => { readItemFromStorage(); });

  useEffect(() => {
    readItemFromStorage();
  }, [decks]);

  return (
    <SafeAreaView style={styles.container}>
      { decks && decks.length > 0
        ? (
          <FlatList
            data={decks}
            renderItem={({ item, index }) => (
              <RenderItem
                border={index !== decks.length - 1}
                item={item}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.title}
            extraData={decks}
          />
        )
        : (
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={{ textAlign: 'center' }}> No Deck found</Text>
            <Button
              title="Create Deck"
              onPress={() => {
                navigation.navigate('Add Deck');
              }}
            />
          </View>
        )}
      <StatusBar backgroundColor="blue" barStyle="dark-content" />

    </SafeAreaView>
  );
};

Decks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Decks;
