import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const DeleteText = styled.Text`
    text-align: center;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 30px;
    align-self: stretch;
    color:red;
`

const DeleteButton = (props) =>
    <TouchableWithoutFeedback {...props}>
        <DeleteText>
            Delete
        </DeleteText>
    </TouchableWithoutFeedback >;

export default DeleteButton;
