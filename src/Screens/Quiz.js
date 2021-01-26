/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import CardFlip from 'react-native-card-flip';
import {
  Title, CorrectButton, InCorrectButton, Button,
} from '../Shared';
import { getCards } from '../Storage/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  status: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  space: {

  },
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: 320,
    height: 320,
  },
  card: {
    width: 320,
    height: 320,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    justifyContent: 'center',

  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 48,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

const Counter = ({ current, total, ...props }) => (
  <Text {...props}>
    {current}
    {' '}
    /
    {' '}
    {total}
  </Text>
);

Counter.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const Answer = () => (
  <Text style={{
    marginTop: 10, color: 'red', textAlign: 'center', fontWeight: 'bold',
  }}
  >
    Answer
  </Text>
);

const Spacer = () => <View />;

const EndGame = ({ stats, restart, goback }) => {
  const { yes, no } = stats;
  const percentece = (yes / (yes + no)).toFixed(2) * 100;
  const color = percentece !== 0 ? '#028004' : '#d4271c';
  const quizResult = percentece !== 0 ? 'pass' : 'fail';

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Title>
            Quiz
            {' '}
            {quizResult}
          </Title>
          <Title style={{ color, marginTop: 10 }}>
            %
            {percentece}
          </Title>
          <Text style={{ textAlign: 'center', color, marginBottom: 20 }}>Correct</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40 }}>
          <CorrectButton title={`${yes} Correct`} inline />
          <InCorrectButton title={`${no} Wrong`} inline />
        </View>
        <Button title="Re-Start" secondary onPress={restart} />
        <Button title="Go back" inline onPress={goback} />
      </View>
    </View>
  );
};

EndGame.propTypes = {
  stats: PropTypes.shape({ yes: PropTypes.number, no: PropTypes.number }).isRequired,
  restart: PropTypes.instanceOf(Function),
  goback: PropTypes.instanceOf(Function),
};

EndGame.defaultProps = {
  restart: () => { },
  goback: () => { },
};

class FlipCard extends React.Component {
  render() {
    // !FIXME: Card flip and rotate back when clicked a button
    const { answer, question } = this.props;
    return (
      <View style={styles.container1}>
        <CardFlip style={styles.cardContainer} ref={(card) => (this.card = card)}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card1]}
            onPress={() => this.card.flip()}
          >
            <Text style={styles.label}>{question}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card2]}
            onPress={() => this.card.flip()}
          >
            <Text style={styles.label}>{answer}</Text>
          </TouchableOpacity>
        </CardFlip>
      </View>
    );
  }
}
FlipCard.propTypes = {
  answer: PropTypes.string,
  question: PropTypes.string,
};

FlipCard.defaultProps = {
  answer: '',
  question: '',
};

const Quiz = ({ route, navigation }) => {
  const title = route && route.params && route.params.title ? route.params.title : 'undefined';
  const [questions, setQuestions] = useState([]);

  const [current, setCurrent] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({ question: '' });
  const [stats, setStats] = useState({ yes: 0, no: 0 });
  const [quizMode, setQuizMode] = useState(true);

  const getQuestions = async () => {
    const cards = await getCards(title);
    // TODO: shuffle questions
    setQuestions(cards);
    setCurrentQuestion(cards[current]);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const nextQuestion = () => {
    setCurrent(current + 1);
    setCurrentQuestion(questions[current + 1]);
  };
  const statHandler = (vote) => {
    setStats({ ...stats, [vote]: stats[vote] + 1 });
  };

  const gameHandler = (vote) => {
    statHandler(vote);
    if (questions.length > current + 1) {
      nextQuestion();
    } else {
      // TODO: GAME end
      setQuizMode(false);
    }
  };
  const restart = () => {
    setQuizMode(true);
    setCurrent(0);
    setStats({ yes: 0, no: 0 });
    setCurrentQuestion(questions[0]);
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    (questions.length > 0)
      ? (quizMode === true) ? (
        <View style={styles.container}>
          <Counter style={styles.status} current={current + 1} total={questions.length} />
          <Spacer />
          <View>
            <FlipCard
              question={currentQuestion.question}
              answer={currentQuestion.answer}
            />
            <Answer />
          </View>
          <View>
            <CorrectButton onPress={() => gameHandler('yes')} />
            <InCorrectButton onPress={() => gameHandler('no')} />
          </View>
        </View>
      )
        : <EndGame stats={stats} restart={() => { restart(); }} goback={() => { goBack(); }} />
      : <Text>Loading</Text>
  );
};

Quiz.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Quiz;
