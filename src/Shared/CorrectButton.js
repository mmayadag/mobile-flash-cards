import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${props => (props.red ? '#d4271c' : '#028004')};
    padding: 20px 15px;
    border-color: gray;
    border-style: solid;
    margin-horizontal: ${props => (props.inline ? '0' : '60px')};
    border-radius: 10px;
    margin-top: 15px;
`

const ButtonText = styled.Text`
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
`;

const StyledButton = ({ title, ...props }) => {
    const { red = false } = props;
    return (
        <ButtonContainer {...props}>
            <ButtonText red={red}>{title}</ButtonText>
        </ButtonContainer>
    );
}

const CorrectButton = (props) => <StyledButton title="Correct" {...props} />;

const InCorrectButton = (props) => <StyledButton red title="Incorrect" {...props} />;

export { CorrectButton, InCorrectButton };