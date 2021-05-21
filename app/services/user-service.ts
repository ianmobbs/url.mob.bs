import AccountsManager from "../managers/accounts-manager";
import User from "../model/entities/User";
import UserAlreadyExistsError from "../exception/user-already-exists-error";

export default class UserService {
    private accountsManager: AccountsManager;

    constructor() {
        this.accountsManager = new AccountsManager();
    }

    public createUser = async (email: string, password: string): Promise<User> => {
        const existingUser = await this.accountsManager.getUser(email);
        if (existingUser) {
            throw new UserAlreadyExistsError(`User ${email} already exists`)
        }
        const userObj = this.accountsManager.createUser(email, password);
        return userObj;
    }
}