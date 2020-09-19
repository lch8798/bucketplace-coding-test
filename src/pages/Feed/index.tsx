import React, { useEffect } from 'react';
import styled from 'styled-components';
import configs from '@configs/index';
import { Card } from '@components/index';
import useFeed from '@hooks/useFeed';

export default function Feed(): JSX.Element {
    const feed = useFeed();

    useEffect(() => {
        feed.fetchCards();
    }, []);

    return (
        <Wrap>
            <CardList>
                {feed.state.cards.map((card) => (
                    <Card card={card} />
                ))}
            </CardList>
            <button onClick={() => feed.fetchCards()}>Fetch</button>
        </Wrap>
    );
}

const Wrap = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: ${configs.style.pc.width}px;
`;

const CardList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
