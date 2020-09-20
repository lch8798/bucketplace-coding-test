import { GetState } from '@modules/index';
import { Card } from '@modules/feed/index';
import api from '@api/index';
import utils from '@utils/index';

// action types
export const SET_CARDS = 'feed/SET_CARDS';
export const SET_CARDS_SUCCESS = 'feed/SET_CARDS_SUCCESS';
export const SET_CARDS_FAILURE = 'feed/SET_CARDS_FAILURE';

/**
 * next page 카드 데이터 가져오기, localStorage 캐싱된 값 대조
 */
export const fetchCards = () => async (dispatch: any, getState: GetState) => {
    const { page, cards } = getState().feed;
    const newPage = page + 1;

    try {
        dispatch({ type: SET_CARDS });

        // select from api server
        const responseCards = await api.feed.getCards(newPage);

        // localStorage 에 저장되었던 카드 데이터라면 저장된 값 사용
        const newCards = cards.concat(
            responseCards.map((responseCard) => {
                const cachedData: Card | null = utils.localStorage.get(
                    responseCard.id
                );

                return {
                    id: responseCard.id,
                    imageURL: responseCard.image_url,
                    nickname: responseCard.nickname,
                    profileImageURL: responseCard.profile_image_url,
                    isScrap: cachedData === null ? false : cachedData.isScrap,
                };
            })
        );

        dispatch({ type: SET_CARDS_SUCCESS, page: newPage, cards: newCards });
    } catch (error) {
        dispatch({ type: SET_CARDS_FAILURE, page: newPage });
    }
};

/**
 * 특정 카드 스크랩
 * @param cardID
 * @param isScrap
 */
export const scrapCard = (cardID: number, isScrap: boolean) => (
    dispatch: any,
    getState: GetState
) => {
    const { page, cards } = getState().feed;

    try {
        const newCards = cards.map((card) => {
            // 요청한 card 일 때
            if (card.id == cardID) {
                const newCard: Card = {
                    ...card,
                    isScrap,
                };

                // localStorage 캐싱
                utils.localStorage.set(card.id, newCard);

                return newCard;
            }

            return card;
        });

        dispatch({ type: SET_CARDS_SUCCESS, page, cards: newCards });
    } catch (e) {
        dispatch({ type: SET_CARDS_FAILURE, page });
    }
};
