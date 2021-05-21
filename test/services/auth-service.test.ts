import AuthService from "../../app/services/auth-service";
import {
    MOCK_AUTH_COOKIE_VALUE,
    MOCK_PASSWORD,
    MOCK_PASSWORD_SALT,
    MOCK_TEXT,
    MOCK_TEXT_BASE_64_ENCODED,
    MOCK_USERNAME
} from "../mocks";
const authService = new AuthService();

describe('auth-service.ts unit tests', () => {
    describe('hashPassword', () => {
        it('hashes the password provided', async () => {
            const hashedPassword = await authService.hashPassword(MOCK_PASSWORD_SALT, MOCK_PASSWORD);
            expect(hashedPassword).not.toEqual(MOCK_PASSWORD);
        })
    })

    describe('checkPassword', () => {
        it('successfully validates a password', async () => {
            const hashedPassword = await authService.hashPassword(MOCK_PASSWORD_SALT, MOCK_PASSWORD);
            const isPasswordOk = await authService.checkPassword(MOCK_PASSWORD, hashedPassword);
            expect(isPasswordOk).toEqual(true);
        })
    })

    describe('toBase64', () => {
        it('converts text to base64', () => {
            const base64text = authService.toBase64(MOCK_TEXT);
            expect(base64text).toEqual(MOCK_TEXT_BASE_64_ENCODED);
        })

        it('returns an empty string when passed empty text', () => {
            const base64text = authService.toBase64('')
            expect(base64text).toEqual('');
        })
    })

    describe('fromBase64', () => {
        it('converts text from base64', () => {
            const text = authService.fromBase64(MOCK_TEXT_BASE_64_ENCODED);
            expect(text).toEqual(MOCK_TEXT);
        })

        it('returns an empty string when passed empty text', () => {
            const text = authService.fromBase64('')
            expect(text).toEqual('');
        })
    })

    describe('generateLoginCookieValue', () => {
        it('creates a base64(username:password) value', () => {
            const cookieValue = authService.generateLoginCookieValue(MOCK_USERNAME, MOCK_PASSWORD)
            expect(cookieValue).toEqual(MOCK_AUTH_COOKIE_VALUE);
        })
    })
})