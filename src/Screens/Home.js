import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import Decks from './Decks';
import AddQuestion from './AddQuestion';
import { Ionicons } from '@expo/vector-icons';

const BottomTabs = createBottomTabNavigator();

const Home = ({ navigation }) => (
    <BottomTabs.Navigator barStyle={styles.tabBar}>
        <BottomTabs.Screen
            name="Decks"
            component={Decks}
            options={{
                tabBarLabel: 'Decks',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="layers-outline" size={size} color={color} />
                ),
            }}
        />
        <BottomTabs.Screen
            name="AddQuestion"
            component={AddQuestion}
            options={{
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="layers-outline" size={size} color={color} />
                ),
            }}
        />
    </BottomTabs.Navigator>
);

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'white',
    },
});

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