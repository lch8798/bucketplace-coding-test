export type Card = {
    id: number;
    imageURL: string;
    nickname: string;
    profileImageURL: string;
    isScrap: boolean;
};

export type FeedState = {
    page: number;
    cards: Card[];
};
