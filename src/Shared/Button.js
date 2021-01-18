import React from 'react';
// import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${props => (props.secondary ? 'white' : 'black')};;
    padding: 15px;
    border-color: gray;
    border-style: solid;
    margin-horizontal: 60px;
    border-radius: 50px;
    margin-top: 20px;
`

const ButtonText = styled.Text`
    color: ${props => (props.secondary ? 'black' : 'white')};
    text-align: center;
`;

const Button = ({ title, ...props }) => {
    const { secondary = false } = props;
    return (
        <ButtonContainer {...props}>
            <ButtonText secondary={secondary}>{title}</ButtonText>
        </ButtonContainer>
    );
}

export default Button;