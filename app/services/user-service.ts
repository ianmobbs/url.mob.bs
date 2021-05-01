import AccountsManager from "../managers/accounts-manager";
import User from "../model/entities/User";
import AuthService from "./auth-service";

export class UserService {
    private accountsManager: AccountsManager;
    private authService: AuthService;

    constructor() {
        this.accountsManager = new AccountsManager();
        this.authService = new AuthService();
    }

    public createUser = async (email: string, password: string): Promise<User> => {
        const existingUser = await this.accountsManager.getUser(email);
        if (existingUser) {
            throw Error('This user already exists')
        }
        const userObj = this.accountsManager.createUser(email, password);
        return userObj;
    }
}