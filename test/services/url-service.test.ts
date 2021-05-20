import User from "../../app/model/entities/User";

const MOCK_URL_MANAGER = {
    init: jest.fn(),
    getAllURLsForUser: jest.fn()
}
const mockUser: User = {
    id: '12345',
    email: 'ianmobbs@gmail.com',
    passwordHash: '12345'
}
const MOCK_URL: URL = {
    clicks: [],
    id: '12345',
    user: mockUser,
    shortUrlId: 'abcdef',
    longURL: 'google.com',
    expiration: 12345
};

jest.mock('@app/managers/url-manager.ts', () => {
    return jest.fn().mockImplementation(() => MOCK_URL_MANAGER);
});

import URLService from "../../app/services/url-service";
import URL from "../../app/model/entities/URL";
const urlService = new URLService();

describe('url-service.ts unit tests', () => {
    describe('getAllURLsForUser', () => {
        it('should return an array of URLs', async () => {
            MOCK_URL_MANAGER.getAllURLsForUser.mockReturnValue([MOCK_URL])
            const urls = await urlService.getAllURLsForUser(mockUser)
            expect(urls).toEqual([MOCK_URL]);
        })

        it('should call the url manager with the user passed to the service', () => {
            urlService.getAllURLsForUser(mockUser)
            expect(MOCK_URL_MANAGER.getAllURLsForUser).toBeCalledWith(mockUser)
        })
    })
})