import React from 'react';
import styled from 'styled-components';

export default function Loading(): JSX.Element {
    return (
        <Wrap>
            <LoadingContents>Loading...</LoadingContents>
        </Wrap>
    );
}
const Wrap = styled.div`
    padding: 50px 0;
`;

const LoadingContents = styled.p`
    text-align: center;
    font-size: 22px;
`;
