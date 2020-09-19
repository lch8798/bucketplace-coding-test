import { Dispatch } from 'redux';
import { GetState } from '@modules/index';
import api from '@api/index';

// action types
export const SET_CARDS = 'pid/SET_CARDS';
export const SET_CARDS_SUCCESS = 'pid/SET_CARDS_SUCCESS';
export const SET_CARDS_FAILURE = 'pid/SET_CARDS_FAILURE';

// actions
export const fetchCards = (page: number) => async (
    dispatch: Dispatch,
    getState: GetState
) => {
    try {
        dispatch({ type: SET_CARDS });

        const cards = await api.pid.getCards(page);

        dispatch({ type: SET_CARDS_SUCCESS, cards });
    } catch (error) {
        dispatch({ type: SET_CARDS_FAILURE });
    }
};
