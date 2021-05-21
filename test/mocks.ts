import User from "../app/model/entities/User";
import URL from "../app/model/entities/URL";
import Click from "../app/model/entities/Click";

export const MOCK_URL_MANAGER = {
    init: jest.fn(),
    getAllURLsForUser: jest.fn(),
    createUrl: jest.fn(),
    getURLByLongURL: jest.fn(),
    getURLByShortIDAndUser: jest.fn()
}
export const MOCK_USER: User = {
    id: '12345',
    email: 'ianmobbs@gmail.com',
    passwordHash: '12345'
}
export const MOCK_SHORT_URL_ID = 'abcdef';
export const MOCK_LONG_URL = 'google.com';
export const MOCK_URL_ID = '12345';
export const MOCK_URL_EXPIRATION = 12345;
export const MOCK_URL: URL = {
    clicks: [],
    id: MOCK_URL_ID,
    user: MOCK_USER,
    shortUrlId: MOCK_SHORT_URL_ID,
    longURL: MOCK_LONG_URL,
    expiration: MOCK_URL_EXPIRATION
};
export const MOCK_CLICK_ID = 'mockClickId';
export const MOCK_CLICK_TIMESTAMP = new Date('9999999999');
export const MOCK_CLICK: Click = {
    id: MOCK_CLICK_ID,
    timestamp: MOCK_CLICK_TIMESTAMP,
    url: MOCK_URL
}