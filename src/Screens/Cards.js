import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../Shared';
import { getCards, deleteCard } from '../Storage/Store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: StatusBar.currentHeight || 0,
  },
});

const RenderItem = ({
  item: { question, answer }, navigation, border, onDelete,
}) => (
  <View style={((border === true) ? { borderBottomWidth: 1, borderBottomColor: 'lightgray' } : '')}>
    <TouchableOpacity onPress={async () => {
      navigation.goBack();
    }}
    >
      <View
        style={{
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        }}
        onPress={() => { }}
      >
        <Text style={{ marginBottom: 10 }}>
          Q:
          {' '}
          {question}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          A:
          {' '}
          {answer}
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: 'white',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: 'white',
          }}
          onPress={onDelete}
        >
          <Text style={{
            color: 'red',
          }}
          >
            Delete
            {' '}
          </Text>
          <MaterialIcons name="delete-forever" size={24} color="red" />

        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </View>
);

RenderItem.propTypes = {
  item: PropTypes.shape({ question: PropTypes.string, answer: PropTypes.string }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  border: PropTypes.bool,
  onDelete: PropTypes.instanceOf(Function),
};

RenderItem.defaultProps = {
  item: { question: '', answer: '' },
  border: true,
  onDelete: () => { },
};

const Cards = ({ route, navigation }) => {
  const title = route && route.params && route.params.title ? route.params.title : 'undefined';
  const [questions, setQuestions] = useState([]);

  const deleteAndGoDecks = async (item) => {
    await deleteCard(title, item);
    navigation.goBack();
  };
  const getQuestions = async () => {
    const cards = await getCards(title);
    setQuestions(cards);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      { questions && questions.length > 0
        ? (
          <FlatList
            data={questions}
            renderItem={({ item, index }) => (
              <RenderItem
                border={index !== questions.length - 1}
                item={item}
                navigation={navigation}
                onDelete={() => { deleteAndGoDecks(item); }}
              />
            )}
            keyExtractor={(item) => item.question}
            extraData={questions}
          />
        )
        : (
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>
              {' '}
              There isn&apos;t any Question in
              {title}
              {' '}
              deck.
            </Text>
            <Button
              title="Add new Questions"
              onPress={() => {
                navigation.navigate('Add Card', { title });
              }}
            />
          </View>
        )}
    </SafeAreaView>
  );
};

Cards.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Cards;
