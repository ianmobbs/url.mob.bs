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
export const MOCK_USER_ID = 'userId12345'
export const MOCK_USERNAME = 'ian@ian.ian'
export const MOCK_PASSWORD_SALT = MOCK_USERNAME
export const MOCK_PASSWORD = 'password'
export const MOCK_PASSWORD_HASH = '$2$bapassword'
export const MOCK_USER: User = {
    id: MOCK_USER_ID,
    email: MOCK_USERNAME,
    passwordHash: MOCK_PASSWORD_HASH
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
export const MOCK_CLICK_MANAGER = {
    init: jest.fn(),
    getAllClicksForUser: jest.fn(),
    getAllClicksForUrl: jest.fn()
}
export const MOCK_ACCOUNTS_MANAGER = {
    init: jest.fn(),
    createUser: jest.fn(),
    getUser: jest.fn(),
    setupRepository: jest.fn()
}
export const MOCK_AUTH_SERVICE = {
    init: jest.fn(),
    hashPassword: jest.fn(),
    checkPassword: jest.fn(),
    toBase64: jest.fn(),
    fromBase64: jest.fn(),
    generateLoginCookieValue: jest.fn()
}
export const MOCK_TEXT = 'abcdefghijklmnopqrstuvwxyz0123456789'
export const MOCK_TEXT_BASE_64_ENCODED = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5';
export const MOCK_AUTH_COOKIE_VALUE = 'aWFuQGlhbi5pYW46cGFzc3dvcmQ='