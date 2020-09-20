import { GetState } from '@modules/index';
import { Card } from '@modules/feed/index';
import api from '@api/index';
import utils from '@utils/index';

// action types
export const SET_CARDS = 'feed/SET_CARDS';
export const SET_CARDS_SUCCESS = 'feed/SET_CARDS_SUCCESS';
export const SET_CARDS_FAILURE = 'feed/SET_CARDS_FAILURE';
export const SET_CARD_SCRAP = 'feed/SET_CARD_SCRAP';
export const SET_LAST_PAGE = 'feed/SET_LAST_PAGE';
export const SET_CACHED_CARDS = 'feed/SET_CACHED_CARDS';

/**
 * next page 카드 데이터 가져오기, localStorage 캐싱된 값 대조
 */
export const fetchCards = () => async (dispatch: any, getState: GetState) => {
    const { loading, page, lastPage, cards } = getState().feed;
    const newPage = page + 1;

    // 현재 로딩 중이라면 취소
    if (loading) return;

    // 마지막 페이지 정보가 있다면 취소
    if (Boolean(lastPage) && lastPage < newPage) return;

    try {
        dispatch({ type: SET_CARDS, page: newPage });

        // fetch from api server
        const responseCards = await api.feed.getCards(newPage);
        const isLastPage = responseCards.length === 0;

        // 마지막 페이지라면
        if (isLastPage) {
            dispatch({
                type: SET_LAST_PAGE,
                lastPage: page,
            });
        }

        // 성공적으로 데이터를 불러왔다면
        if (!isLastPage) {
            // localStorage 에 저장되었던 카드 데이터라면 저장된 값 사용
            const newCards = cards.concat(
                responseCards.map((responseCard) => {
                    const cachedData: Card | null = utils.localStorage.get(
                        getKey(responseCard.id)
                    );

                    return {
                        id: responseCard.id,
                        imageURL: responseCard.image_url,
                        nickname: responseCard.nickname,
                        profileImageURL: responseCard.profile_image_url,
                        isScrap:
                            cachedData === null ? false : cachedData.isScrap,
                    };
                })
            );
            dispatch({
                type: SET_CARDS_SUCCESS,
                page: newPage,
                cards: newCards,
            });
        }
    } catch (error) {
        // 에러가 나더라도 다음 페이지 요청을 할 수 있게 newPage
        dispatch({ type: SET_CARDS_FAILURE, page: newPage });
    }
};

/**
 * localStorage 에 캐싱된 카드 데이터 가져오기
 */
export const fetchCachedCards = () => (dispatch: any, getState: GetState) => {
    // fetch from localStorage
    const cachedCards = getAllOnlyCard();

    dispatch({ type: SET_CACHED_CARDS, cachedCards });
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
    const { cards, cachedCards } = getState().feed;

    const newCards = cards.map((card) => {
        // 요청한 card 일 때
        if (card.id == cardID) {
            const newCard: Card = {
                ...card,
                isScrap,
            };

            // localStorage 캐싱
            utils.localStorage.set(getKey(card.id), newCard);

            return newCard;
        }

        return card;
    });

    const newCachedCards = cachedCards.map((cachedCard) => {
        // 요청한 card 일 때
        if (cachedCard.id == cardID) {
            const newCard: Card = {
                ...cachedCard,
                isScrap,
            };

            return newCard;
        }

        return cachedCard;
    });

    dispatch({
        type: SET_CARD_SCRAP,
        cards: newCards,
        cachedCards: newCachedCards,
    });
};

/**
 * 로컬 스토리지에서 사용할 키 생성
 * @param key
 */
function getKey(key: string | number = '') {
    const LOCAL_STORAGE_KEY = 'CARD';
    return `${LOCAL_STORAGE_KEY}:${key}`;
}

/**
 * 로컬 스토리지에 저장된 모든 카드 데이터 반환
 */
function getAllOnlyCard(): Card[] {
    return Object.entries(utils.localStorage.getAllObject())
        .filter(([key]) => key.indexOf(getKey()) != -1)
        .map(([key, value]) => value);
}
