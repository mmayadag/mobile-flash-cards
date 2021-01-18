import React from 'react';
import { Text, StyleSheet } from 'react-native'

const SubTitle = ({ children }) => <Text style={styles.subTitle}>{children}</Text>

const styles = StyleSheet.create({
    subTitle: {
        paddingTop: 10,
        fontSize: 18,
        color: 'gray'
    }
});

export default SubTitle;

