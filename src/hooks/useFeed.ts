import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@modules/index';
import {
    FeedState,
    fetchCards,
    fetchCachedCards,
    scrapCard,
} from '@modules/feed/index';

export default function useFeed() {
    const state: FeedState = useSelector((state: RootState) => state.feed);

    const dispatch = useDispatch();

    return {
        state,
        fetchCards: useCallback(() => dispatch(fetchCards()), [dispatch]),
        fetchCachedCards: useCallback(() => dispatch(fetchCachedCards()), [
            dispatch,
        ]),
        scrapCard: useCallback(
            (cardID: number, isScrap: boolean) =>
                dispatch(scrapCard(cardID, isScrap)),
            [dispatch]
        ),
    };
}
