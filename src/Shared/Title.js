import React from 'react';
import styled from 'styled-components/native';

const TitleText = styled.Text`
    font-size: 32px;
    color:black;
    text-align: center;
`;

const Title = ({ children, ...props }) =>
    <TitleText {...props}>
        {children}
    </TitleText>;

export default Title;
