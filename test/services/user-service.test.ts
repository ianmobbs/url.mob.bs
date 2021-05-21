import {MOCK_ACCOUNTS_MANAGER, MOCK_PASSWORD_HASH, MOCK_USER, MOCK_USERNAME} from "../mocks";

jest.mock('@app/managers/accounts-manager.ts', () => {
    return jest.fn().mockImplementation(() => MOCK_ACCOUNTS_MANAGER);
});

import UserService from '../../app/services/user-service';
import UserAlreadyExistsError from "../../app/exception/user-already-exists-error";
const userService = new UserService();

describe('user-service.ts unit tests', () => {
    describe('createUser', () => {
        it('creates a user with the given username and password', async () => {
            MOCK_ACCOUNTS_MANAGER.getUser.mockReturnValue(null);
            MOCK_ACCOUNTS_MANAGER.createUser.mockReturnValue(MOCK_USER)
            const user = await userService.createUser(MOCK_USERNAME, MOCK_PASSWORD_HASH);
            expect(MOCK_ACCOUNTS_MANAGER.createUser).toBeCalledWith(MOCK_USERNAME, MOCK_PASSWORD_HASH)
            expect(user).toEqual(MOCK_USER)
        })

        it('throws an error when a username is taken', async () => {
            MOCK_ACCOUNTS_MANAGER.getUser.mockReturnValue(MOCK_USER);
            try {
                await userService.createUser(MOCK_USERNAME, MOCK_PASSWORD_HASH);
            } catch (e) {
                expect(e).toBeInstanceOf(UserAlreadyExistsError)
            }
        });
    })
})