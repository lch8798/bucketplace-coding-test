/**
 * get value
 * @param key
 */
export function get(key: string): any {
    const value = window.localStorage.getItem(key);
    return convertValueForGet(value);
}

/**
 * set value
 * @param key
 * @param value
 */
export function set(key: string, value: any): boolean {
    try {
        window.localStorage.setItem(key, convertValueForSet(value));
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * clear all values
 */
export function clear(): boolean {
    try {
        window.localStorage.clear();
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * convert value for localStorage getItem
 * @param value
 */
function convertValueForGet(value: any): any {
    try {
        return JSON.parse(value);
    } catch (e) {
        return String(value);
    }
}

/**
 * convert value for localStorage setItem
 * @param value
 */
function convertValueForSet(value: any): string {
    if (typeof value == 'object') return JSON.stringify(value);

    return String(value);
}
