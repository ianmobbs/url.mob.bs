import Click from "../model/entities/Click";
import {Repository} from "typeorm";
import DB from "../db/db";
import URLManager from "./url-manager";
import URL from "../model/entities/URL";
import User from "../model/entities/User";

export default class ClickManager {
    private repository: Repository<Click>;
    private urlManager: URLManager;

    constructor() {
        this.setupRepository();
        this.urlManager = new URLManager();
    }

    public addClick = async (url: URL): Promise<Click> => {
        return this.repository.save({url, timestamp: new Date()})
    }

    public getAllClicksForUser = async (user: User): Promise<Click[]> => {
        return this.repository.createQueryBuilder("click")
            .innerJoin("click.url", "url")
            .innerJoin("url.user", "user")
            .where("user.id = :userId and " +
                "url.expiration is null or url.expiration > :expirationTime",
                {userId: user.id, expirationTime: new Date().getTime()})
            .getMany();
    }

    public getAllClicksForUrl = async (user: User, url: URL) => {
        return this.repository.createQueryBuilder("click")
            .innerJoin("click.url", "url")
            .innerJoin("url.user", "user")
            .where("user.id = :userId and " +
                "url.shortUrlId = :shortUrlId and " +
                "url.expiration is null or url.expiration > :expirationTime",
                {userId: user.id, shortUrlId: url.shortUrlId, expirationTime: new Date().getTime()})
            .getMany();
    }

    private setupRepository = async () => {
        const connection = await new DB().getConnection();
        this.repository = connection.getRepository(Click);
    }
}