import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@modules/index';
import { ToastState, addToast, removeToast } from '@modules/toast/index';

export default function useToast() {
    const state: ToastState = useSelector((state: RootState) => state.toast);

    const dispatch = useDispatch();

    return {
        state,
        addToast: useCallback(
            (text: string, duration: number) =>
                dispatch(addToast(text, duration)),
            [dispatch]
        ),
        removeToast: useCallback((id: number) => dispatch(removeToast(id)), [
            dispatch,
        ]),
    };
}
