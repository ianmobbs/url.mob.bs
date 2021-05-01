import {Repository} from "typeorm";
import User from "../model/entities/User";
import DB from "../db/db";
import bcrypt from "bcrypt";
import AuthService from "../services/auth-service";

export default class AccountsManager {
    private userRepository: Repository<User>;
    private authService: AuthService;

    constructor() {
        this.setupRepository();
        this.authService = new AuthService();
    }

    public createUser = async (email: string, password: string): Promise<User> => {
        const passwordHash = await this.authService.hashPassword(email, password);
        return this.userRepository.save({email, passwordHash})
    }

    public getUser = async (email: string): Promise<User> => {
        return await this.userRepository.findOne({email})
    }

    private setupRepository = async () => {
        const connection = await new DB().getConnection();
        this.userRepository = connection.getRepository(User);
    }
}