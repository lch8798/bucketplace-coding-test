import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import configs from '@configs/index';
import { Checkbox, Card } from '@components/index';
import useFeed from '@hooks/useFeed';

export default function Feed(): JSX.Element {
    const feed = useFeed();
    const [onlyScrap, setOnlyScrap] = useState(false);

    useEffect(() => {
        // 첫페이지 fetch
        feed.fetchCards();
    }, []);

    useEffect(() => {
        function handleScroll() {
            const PADDING_BOTTOM = 300;

            const { innerHeight } = window;
            const { scrollHeight } = document.body;

            const scrollTop = document.documentElement.scrollTop;

            if (scrollHeight - innerHeight - scrollTop < PADDING_BOTTOM)
                feed.fetchCards();
        }

        // 스크랩 여부 필터 활성화 시
        if (onlyScrap) {
            // localStorage reload
            feed.fetchCachedCards();

            // remove scroll event handler
            window.removeEventListener('scroll', handleScroll);
        }

        // 스크랩 여부 필터 비활성화 시
        if (!onlyScrap) {
            // init scroll event handler
            window.addEventListener('scroll', handleScroll);
        }

        // remove scroll event handler
        return () => window.removeEventListener('scroll', handleScroll);
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
                            key={card.id}
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
                                key={card.id}
                                card={card}
                                scrapCard={() =>
                                    feed.scrapCard(card.id, !card.isScrap)
                                }
                            />
                        ))}
                </CardList>
            )}
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
