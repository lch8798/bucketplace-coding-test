import utils from '@utils/index';
import configs from '@configs/index';

const BASE_URL = configs.api.apiBaseURL;

/**
 * get feed cards
 * @param page
 */
export async function getCards(page: number) {
    const result = await utils.api.get(`${BASE_URL}/cards/page_${page}.json`);
    const payload = result.data;
    return payload;
}
