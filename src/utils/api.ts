import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// instance for Ajax
const api = axios.create();

/**
 * request GET
 * @param url
 * @param config
 */
export async function get(
    url: string,
    config: AxiosRequestConfig | undefined = undefined
): Promise<AxiosResponse<any>> {
    return await api.get(url, config);
}
