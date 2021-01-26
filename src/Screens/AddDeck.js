import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import {
  Button, CancelButton, Input, Title,
} from '../Shared';

import { createDeckObject } from '../Storage/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const AddDeck = ({ navigation }) => {
  const [question, setQuestion] = useState('');

  const clearForm = () => {
    setQuestion('');
  };
  const NavigateToDecks = () => {
    clearForm();
    navigation.navigate('Decks');
  };

  const writeItemToStorage = async (deckTitle) => {
    await createDeckObject(deckTitle);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title>What is title of your new deck ?</Title>
          <Input
            onChangeText={(text) => { setQuestion(text); }}
            placeholder="title"
            value={question}
            autoFocus
          />
          <Button
            title="Submit"
            onPress={() => {
              if (question && question.length > 0) {
                writeItemToStorage(question);
                NavigateToDecks();
              }
            }}
          />
          <CancelButton onPress={() => { NavigateToDecks(); }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

AddDeck.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddDeck;
