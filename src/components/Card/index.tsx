import React from 'react';
import styled from 'styled-components';
import { Card as CardType } from '@modules/feed/index';
import { UserProfile, Scrap } from '@components/index';

type PropsType = {
    card: CardType;
    scrapCard: Function;
};

export default function Card(props: PropsType): JSX.Element {
    const { card, scrapCard } = props;

    return (
        <Wrap key={card.id}>
            <UserProfile
                profileImage={card.profileImageURL}
                nickname={card.nickname}
            />

            <CardImageWrap>
                <CardImage
                    className={'cardImage'}
                    src={card.imageURL}
                    alt={'Feed Image'}
                />
            </CardImageWrap>

            <ActionsWrap>
                <ActionButtonWrap>
                    <Scrap on={card.isScrap} onClick={scrapCard} />
                </ActionButtonWrap>
            </ActionsWrap>
        </Wrap>
    );
}

const Wrap = styled.div`
    position: relative;
    margin-bottom: 30px;
`;

const CardImageWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 268px;
    height: 268px;
    border-radius: 10px;
    overflow: hidden;

    &:hover {
        > .cardImage {
            width: 110%;
        }
    }
`;

const CardImage = styled.img`
    width: 100%;
    transition-duration: 0.2s;
`;

const ActionsWrap = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`;

const ActionButtonWrap = styled.div`
    margin: 10px;
`;
