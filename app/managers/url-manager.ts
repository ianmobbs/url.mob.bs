import DB from "../db/db";
import URL from "../model/entities/URL";
import {Repository} from "typeorm";

export default class URLManager {
    private repository: Repository<URL>;

    constructor() {
        this.setupRepository()
    }

    public createUrl = async (shortUrlId: string, longURL: string): Promise<URL> => {
        return this.repository.save({
            shortUrlId,
            longURL,
            user: 'ianmobbs'
        })
    }

    public getUrl = async (shortUrlId: string): Promise<URL> => {
        return this.repository.findOne({shortUrlId});
    }

    private setupRepository = async () => {
        const connection = await new DB().getConnection();
        this.repository = connection.getRepository(URL);
    }
}