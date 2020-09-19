export type Card = {
    id: number;
    image_url: string;
    nickname: string;
    profile_image_url: string;
};

export type FeedState = {
    page: number;
    cards: Card[];
};
