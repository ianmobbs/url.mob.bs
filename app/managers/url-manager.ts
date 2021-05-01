import DB from "../db/db";
import URL from "../model/entities/URL";
import {Repository} from "typeorm";
import User from "../model/entities/User";

export default class URLManager {
    private repository: Repository<URL>;

    constructor() {
        this.setupRepository()
    }

    public createUrl = async (user: User, shortUrlId: string, longURL: string): Promise<URL> => {
        return this.repository.save({
            user,
            shortUrlId,
            longURL,
        })
    }

    public getUrl = async (user: User, shortUrlId: string): Promise<URL> => {
        return this.repository.findOne({user, shortUrlId});
    }

    public deleteUrl = async (user: User, shortUrlId: string): Promise<URL> => {
        const urlObjToDelete = this.getUrl(user, shortUrlId);
        await this.repository.delete({user, shortUrlId})
        return urlObjToDelete;
    }

    private setupRepository = async () => {
        const connection = await new DB().getConnection();
        this.repository = connection.getRepository(URL);
    }
}