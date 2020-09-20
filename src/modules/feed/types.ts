export type Card = {
    id: number;
    imageURL: string;
    nickname: string;
    profileImageURL: string;
    isScrap: boolean;
};

export type FeedState = {
    loading: boolean;
    page: number;
    lastPage: number;
    cards: Card[];
    cachedCards: Card[];
};
