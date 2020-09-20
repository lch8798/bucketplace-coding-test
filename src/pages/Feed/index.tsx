import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import configs from '@configs/index';
import { Checkbox, Card } from '@components/index';
import useFeed from '@hooks/useFeed';

export default function Feed(): JSX.Element {
    const feed = useFeed();
    const [onlyScrap, setOnlyScrap] = useState(false);

    useEffect(() => {
        feed.fetchCards();
    }, []);

    useEffect(() => {
        // 스크랩 필터 활성화 시 reload
        if (onlyScrap) feed.fetchCachedCards();
    }, [onlyScrap]);

    return (
        <Wrap>
            {/* 필터링 옵션 컨트롤러 */}
            <FilterOptionWrap>
                <Checkbox
                    on={onlyScrap}
                    label={'스크랩한 것만 보기'}
                    onClick={() => setOnlyScrap(!onlyScrap)}
                />
            </FilterOptionWrap>

            {/* 카드 리스트, 모든 카드 랜더링 */}
            {!onlyScrap && (
                <CardList>
                    {feed.state.cards.map((card) => (
                        <Card
                            card={card}
                            scrapCard={() =>
                                feed.scrapCard(card.id, !card.isScrap)
                            }
                        />
                    ))}
                </CardList>
            )}

            {/* 카드 리스트, 스크랩된 카드만 랜더링 */}
            {onlyScrap && (
                <CardList>
                    {feed.state.cachedCards
                        .filter((card) => card.isScrap)
                        .map((card) => (
                            <Card
                                card={card}
                                scrapCard={() =>
                                    feed.scrapCard(card.id, !card.isScrap)
                                }
                            />
                        ))}
                </CardList>
            )}

            {/* 임시 카드 리스트 Fetch 버튼 */}
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

const FilterOptionWrap = styled.div`
    margin: 30px 0;
`;

const CardList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
