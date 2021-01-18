import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { CardCountText } from '../Utils/Text';
import { Title, SubTitle } from './index';

const DeckItem = ({ title, size, ...props }) => (
    <TouchableOpacity style={styles.item} {...props}>
        <Title>{title}</Title>
        <SubTitle>{CardCountText(size)}</SubTitle>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

export default DeckItem;
