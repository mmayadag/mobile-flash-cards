import React from 'react';
// import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
    background-color: black;
    padding: 15px;
    border-color: gray;
    border-style: solid;
    margin-horizontal: 60px;
    border-radius: 50px;
    margin-top: 20px;
`

const ButtonText = styled.Text`
    color: white;
    text-align: center;
`;

const Button = ({ title, ...props }) =>
    <ButtonContainer {...props}>
        <ButtonText>{title}</ButtonText>
    </ButtonContainer>;

/*
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderColor: "gray",
        borderStyle: "solid",
        marginHorizontal: 60,
        borderRadius: 50,
        marginTop: 20,
    }
})
*/

export default Button;