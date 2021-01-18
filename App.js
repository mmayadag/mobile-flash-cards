import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import HomeScreen from './src/Screens/Home';
import AddCard from './src/Screens/AddCard';
import Deck from './src/Screens/Deck';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add Card" component={AddCard} />
      <Stack.Screen name="Deck" component={Deck} options={({ route }) => ({ title: route.params.title })} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
