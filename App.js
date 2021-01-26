import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import HomeScreen from './src/Screens/Home';
import AddCard from './src/Screens/AddCard';
import Deck from './src/Screens/Deck';
import Cards from './src/Screens/Cards';
import Quiz from './src/Screens/Quiz';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Decks" component={HomeScreen} />
        <Stack.Screen name="Add Card" component={AddCard} />
        <Stack.Screen name="Deck" component={Deck}
          options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="Cards" component={Cards}
          options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="Quiz" component={Quiz}
          options={
            ({ route }) => ({ title: route.params.title, headerBackTitle: 'Quiz' })
          } />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
