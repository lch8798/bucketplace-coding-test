import { AnyAction } from 'redux';
import { FeedState } from './types';
import {
    SET_CARDS,
    SET_CARDS_SUCCESS,
    SET_CARDS_FAILURE,
    SET_LAST_PAGE,
    SET_CACHED_CARDS,
} from './actions';

// default state
const feedState: FeedState = {
    loading: false,
    page: 0,
    lastPage: 0,
    cards: [],
    cachedCards: [],
};

// reducers
export default function feed(
    state: FeedState = feedState,
    action: AnyAction
): FeedState {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                loading: true,
                page: action.page,
            };
        case SET_CARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                page: action.page,
                cards: action.cards,
            };
        case SET_CARDS_FAILURE:
            return {
                ...state,
                loading: false,
                page: action.page,
            };
        case SET_LAST_PAGE:
            return {
                ...state,
                lastPage: action.lastPage,
            };
        case SET_CACHED_CARDS:
            return {
                ...state,
                cachedCards: action.cachedCards,
            };

        default:
            return state;
    }
}
