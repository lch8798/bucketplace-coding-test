import utils from '@utils/index';
import configs from '@configs/index';

const BASE_URL = configs.api.apiBaseURL;

/**
 * get pid cards
 * @param page
 */
export async function getCards(page: number) {
    return await utils.api.get(`${BASE_URL}/cards/page_${page}.json`);
}
