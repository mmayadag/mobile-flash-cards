import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import HomeScreen from './src/Screens/Home';
import AddDeckScreen from './src/Screens/AddQuestion';
import Deck from './src/Shared/Chat';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddDeck" component={AddDeckScreen} />
      <Stack.Screen name="Deck" component={Deck} />

    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
