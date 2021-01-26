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
import { saveQuestion } from '../Storage/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const AddCard = ({ route, navigation }) => {
  const title = route.params.title ?? 'undefined';
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const clearForm = () => {
    setQuestion('');
    setAnswer('');
  };

  const createQuestion = async (q, a) => {
    await saveQuestion(q, a, title);
  };

  const NavigateToDecks = async () => {
    await createQuestion(question, answer);
    clearForm();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title>
            Deck :
            {' '}
            {title}
          </Title>
          <Input
            title="Question"
            onChangeText={(text) => { setQuestion(text); }}
            placeholder="question"
            value={question}
            autoFocus
          />
          <Input
            title="Answer"
            onChangeText={(text) => { setAnswer(text); }}
            placeholder="answer"
            value={answer}
          />
          <Button
            title="Submit"
            onPress={() => {
              NavigateToDecks();
            }}
          />
          <CancelButton onPress={() => { NavigateToDecks(); }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

AddCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddCard;
