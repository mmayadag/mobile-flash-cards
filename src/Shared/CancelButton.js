import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const CancelText = styled.Text`
    text-align: center;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 30px;
    align-self: stretch;
`

const CancelButton = (props) =>
    <TouchableWithoutFeedback {...props}>
        <CancelText>
            Cancel
        </CancelText>
    </TouchableWithoutFeedback >;

export default CancelButton;
