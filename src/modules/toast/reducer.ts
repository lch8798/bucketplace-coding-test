import { AnyAction } from 'redux';
import { ToastState, Toast } from './types';
import { ADD_TOAST, REMOVE_TOAST } from './actions';

// default state
const toastState: ToastState = {
    genID: 0,
    toasts: [],
};

// reducers
export default function toast(
    state: ToastState = toastState,
    action: AnyAction
): ToastState {
    switch (action.type) {
        case ADD_TOAST:
            return {
                ...state,
                genID: action.genID,
                toasts: state.toasts.concat(action.toast),
            };
        case REMOVE_TOAST:
            return {
                ...state,
                toasts: state.toasts.filter(
                    (toast: Toast) => toast.id !== action.id
                ),
            };
        default:
            return state;
    }
}
