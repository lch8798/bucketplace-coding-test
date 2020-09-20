import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import configs from '@configs/index';
import { Checkbox, Card, Loading } from '@components/index';
import useFeed from '@hooks/useFeed';
import useToast from '@hooks/useToast';

export default function Feed(): JSX.Element {
    const feed = useFeed();
    const toast = useToast();
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

    function handleCardScrap(cardID: number, isScrap: boolean) {
        feed.scrapCard(cardID, isScrap);

        toast.addToast(
            isScrap ? '스크랩했습니다' : '스크랩북에서 삭제했습니다.',
            3000
        );
    }

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
                <>
                    <CardList>
                        {feed.state.cards.map((card) => (
                            <Card
                                key={card.id}
                                card={card}
                                scrapCard={() =>
                                    handleCardScrap(card.id, !card.isScrap)
                                }
                            />
                        ))}
                    </CardList>

                    {/* 로딩 */}
                    {feed.state.loading && <Loading />}
                </>
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
                                    handleCardScrap(card.id, !card.isScrap)
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
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 -10px;
`;
