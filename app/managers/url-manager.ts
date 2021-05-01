import DB from "../db/db";
import URL from "../model/entities/URL";
import {Repository} from "typeorm";
import User from "../model/entities/User";

export default class URLManager {
    private repository: Repository<URL>;

    constructor() {
        this.setupRepository()
    }

    public getAllURLsForUser = async (user: User): Promise<URL[]> => {
        return this.repository.find({user});
    }

    public createUrl = async (user: User, shortUrlId: string, longURL: string): Promise<URL> => {
        return this.repository.save({
            user,
            shortUrlId,
            longURL,
        })
    }

    public getURLByShortID = async (shortUrlId: string): Promise<URL> => {
        return this.repository.findOne({shortUrlId})
    }

    public getURLByShortIDAndUser = async (user: User, shortUrlId: string): Promise<URL> => {
        return this.repository.findOne({user, shortUrlId});
    }

    public getURLByLongURL = async (user: User, longURL: string): Promise<URL> => {
        return this.repository.findOne({user, longURL})
    }

    public deleteUrl = async (user: User, shortUrlId: string): Promise<URL> => {
        const urlObjToDelete = this.getURLByShortIDAndUser(user, shortUrlId);
        await this.repository.delete({user, shortUrlId})
        return urlObjToDelete;
    }

    private setupRepository = async () => {
        const connection = await new DB().getConnection();
        this.repository = connection.getRepository(URL);
    }
}