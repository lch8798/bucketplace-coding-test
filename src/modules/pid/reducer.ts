import { AnyAction } from 'redux';
import { PidState } from './types';
import { SET_CARDS } from './actions';

// default state
const pidState: PidState = {
    page: 1,
    cards: [],
};

// reducers
export default function pid(
    state: PidState = pidState,
    action: AnyAction
): PidState {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.cards,
            };
        default:
            return state;
    }
}
