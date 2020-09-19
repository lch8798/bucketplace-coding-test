import { GetState } from '@modules/index';
import api from '@api/index';

// action types
export const SET_CARDS = 'feed/SET_CARDS';
export const SET_CARDS_SUCCESS = 'feed/SET_CARDS_SUCCESS';
export const SET_CARDS_FAILURE = 'feed/SET_CARDS_FAILURE';

// actions
export const fetchCards = () => async (dispatch: any, getState: GetState) => {
    const { page, cards } = getState().feed;
    const newPage = page + 1;

    try {
        dispatch({ type: SET_CARDS });

        const newCards = cards.concat(await api.feed.getCards(newPage));

        dispatch({ type: SET_CARDS_SUCCESS, page: newPage, cards: newCards });
    } catch (error) {
        dispatch({ type: SET_CARDS_FAILURE, page: newPage });
    }
};
