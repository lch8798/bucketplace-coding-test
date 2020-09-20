import utils from '@utils/index';
import configs from '@configs/index';

const BASE_URL = configs.api.apiBaseURL;

type ResponseCard = {
    id: number;
    image_url: string;
    nickname: string;
    profile_image_url: string;
};

/**
 * get feed cards
 * @param page
 */
export async function getCards(page: number): Promise<ResponseCard[]> {
    const result = await utils.api.get(`${BASE_URL}/cards/page_${page}.json`);
    const payload: ResponseCard[] = result.data;
    return payload;
}
