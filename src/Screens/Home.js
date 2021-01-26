/* eslint-disable react/prop-types */
import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Decks from './Decks';
import AddDeck from './AddDeck';

const BottomTabs = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
});

const Home = () => (
  <BottomTabs.Navigator barStyle={styles.tabBar}>
    <BottomTabs.Screen
      name="Decks"
      component={Decks}
      options={{
        tabBarLabel: 'Decks',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="layers-outline" size={size} color={color} />
        ),
        title: 'test',
      }}
    />
    <BottomTabs.Screen
      name="Add Deck"
      component={AddDeck}
      options={{
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="layers-outline" size={size} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

export default Home;
/*

                options={{
                    title: 'Decks',
                    tabBarIcon: <Ionicons name="layers-outline" size={24} color="#C9E7F8" />,
                }}
<BottomTabs.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: <Ionicons name="layers-outline" size={24} color="#C9E7F8" />,
                    tabBarColor: '#9FD5C9',
                    tabBarBadge: true,
                }}
            />
*/
