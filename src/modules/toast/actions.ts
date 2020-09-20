import { GetState } from '@modules/index';
import { Toast } from '@modules/toast/index';
import api from '@api/index';
import utils from '@utils/index';

// action types
export const ADD_TOAST = 'toast/ADD_TOAST';
export const REMOVE_TOAST = 'toast/REMOVE_TOAST';

/**
 * Toast Item 추가
 * @param text
 * @param duration
 */
export const addToast = (text: string, duration: number) => (
    dispatch: any,
    getState: GetState
) => {
    const { genID } = getState().toast;

    const toast: Toast = {
        id: genID + 1,
        text,
        duration,
    };

    dispatch({ type: ADD_TOAST, genID: toast.id, toast });
};

/**
 * Toast Item 제거
 * @param id
 */
export const removeToast = (id: number) => (
    dispatch: any,
    getState: GetState
) => {
    dispatch({ type: REMOVE_TOAST, id });
};
