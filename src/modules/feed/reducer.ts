import { AnyAction } from 'redux';
import { FeedState } from './types';
import { SET_CARDS, SET_CARDS_SUCCESS, SET_CARDS_FAILURE } from './actions';

// default state
const feedState: FeedState = {
    page: 0,
    cards: [],
};

// reducers
export default function feed(
    state: FeedState = feedState,
    action: AnyAction
): FeedState {
    switch (action.type) {
        case SET_CARDS:
            return state;
        case SET_CARDS_SUCCESS:
            return {
                ...state,
                page: action.page,
                cards: action.cards,
            };
        case SET_CARDS_FAILURE:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
}
