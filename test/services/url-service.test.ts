import {MOCK_LONG_URL, MOCK_SHORT_URL_ID, MOCK_URL, MOCK_URL_EXPIRATION, MOCK_URL_MANAGER, MOCK_USER} from "../mocks";
import URLAlreadyExistsError from "../../app/exception/url-already-exists-error";

jest.mock('@app/managers/url-manager.ts', () => {
    return jest.fn().mockImplementation(() => MOCK_URL_MANAGER);
});

import URLService from "../../app/services/url-service";
const urlService = new URLService();

describe('url-service.ts unit tests', () => {
    describe('getAllURLsForUser', () => {
        it('should return an array of URLs', async () => {
            MOCK_URL_MANAGER.getAllURLsForUser.mockReturnValue([MOCK_URL])
            const urls = await urlService.getAllURLsForUser(MOCK_USER)
            expect(urls).toEqual([MOCK_URL]);
        })

        it('should call the url manager with the user passed to the service', () => {
            urlService.getAllURLsForUser(MOCK_USER)
            expect(MOCK_URL_MANAGER.getAllURLsForUser).toBeCalledWith(MOCK_USER)
        })
    })

    describe('generateShortUrl', () => {
        it('returns a URL with the same short url id passed', async () => {
            MOCK_URL_MANAGER.getURLByLongURL.mockReturnValue(null);
            await urlService.generateShortUrl(MOCK_USER, MOCK_LONG_URL, MOCK_SHORT_URL_ID, MOCK_URL_EXPIRATION);
            expect(MOCK_URL_MANAGER.createUrl).toBeCalledWith(MOCK_USER, MOCK_SHORT_URL_ID, MOCK_LONG_URL, MOCK_URL_EXPIRATION);
        });

        it('errors when a long url is shortened twice', async () => {
            MOCK_URL_MANAGER.getURLByLongURL.mockReturnValue(MOCK_URL);
            try {
                await urlService.generateShortUrl(MOCK_USER, MOCK_LONG_URL, MOCK_SHORT_URL_ID, MOCK_URL_EXPIRATION);
            } catch (e) {
                expect(e).toBeInstanceOf(URLAlreadyExistsError)
            }
        });

        it('generates a short URL ID and expiration when one isn\'t passed', async () => {
            MOCK_URL_MANAGER.getURLByLongURL.mockReturnValue(null);
            await urlService.generateShortUrl(MOCK_USER, MOCK_LONG_URL);
            expect(MOCK_URL_MANAGER.createUrl).toBeCalledWith(MOCK_USER, expect.any(String), MOCK_LONG_URL, expect.any(Number));
        });
    })

    describe('getLongUrl', () => {
        it('passes the short URL ID to URLManager', async () => {
            MOCK_URL_MANAGER.getURLByShortIDAndUser.mockReturnValue(MOCK_URL);
            const url = await urlService.getLongUrl(MOCK_USER, MOCK_SHORT_URL_ID);
            expect(MOCK_URL_MANAGER.getURLByShortIDAndUser).toBeCalledWith(MOCK_USER, MOCK_SHORT_URL_ID)
            expect(url.longURL).toEqual(MOCK_LONG_URL);
        });
    })
})