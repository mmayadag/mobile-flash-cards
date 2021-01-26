import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { DeckItem, Button, DeleteButton } from '../Shared';
import { getDeck, deleteDeck } from '../Storage/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: StatusBar.currentHeight || 0,
  },
});

const Deck = ({ route, navigation }) => {
  const DeckTitle = route && route.params && route.params.title ? route.params.title : 'undefined';

  const [QuestionsCount, setQuestionsCount] = useState(0);

  const readDeckData = async () => {
    const deck = await getDeck(DeckTitle);
    setQuestionsCount(deck.questions.length);
  };

  const deleteAndGoDecks = async () => {
    await deleteDeck(DeckTitle);
    navigation.navigate('Decks');
  };
  navigation.addListener('focus', () => { readDeckData(); });

  // TODO: Fix here

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={async () => {
        navigation.navigate('Cards', {
          title: DeckTitle,
        });
      }}
      >
        <DeckItem title={DeckTitle} size={QuestionsCount} />
      </TouchableOpacity>
      <View>
        <Button
          secondary
          title="Add Card"
          onPress={() => {
            navigation.navigate('Add Card', {
              title: DeckTitle,
            });
          }}
        />
        <Button
          title="Start Quiz"
          onPress={() => {
            navigation.navigate('Quiz', {
              title: DeckTitle,
            });
          }}
        />
        <DeleteButton onPress={async () => {
          await deleteAndGoDecks();
        }}
        />
      </View>
    </View>
  );
};

Deck.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Deck;
