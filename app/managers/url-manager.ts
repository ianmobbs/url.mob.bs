import DB from "../db/db";
import URL from "../model/entities/URL";
import {IsNull, MoreThan, Repository} from "typeorm";
import User from "../model/entities/User";

export default class URLManager {
    private repository: Repository<URL>;

    constructor() {
        this.setupRepository()
    }

    public getAllURLsForUser = async (user: User): Promise<URL[]> => {
        return this.repository.createQueryBuilder()
            .where(
                "url.userId = :userId and expiration is null or expiration > :expirationTime",
                {userId: user.id, expirationTime: new Date().getTime()}
            )
            .getMany();
    }

    public createUrl = async (user: User, shortUrlId: string, longURL: string, expiration?: number): Promise<URL> => {
        return this.repository.save({
            user,
            shortUrlId,
            longURL,
            expiration
        })
    }

    public getURLByShortID = async (shortUrlId: string): Promise<URL> => {
        return this.repository.createQueryBuilder()
            .where(
                "url.shortUrlId = :shortUrlId and " +
                "(expiration is null or expiration > :expirationTime)",
                {shortUrlId, expirationTime: new Date().getTime()}
            )
            .getOne();
    }

    public getURLByShortIDAndUser = async (user: User, shortUrlId: string): Promise<URL> => {
        return this.repository.createQueryBuilder()
            .where(
                "url.userId = :userId and " +
                "url.shortUrlId = :shortUrlId and " +
                "(expiration is null or expiration > :expirationTime)",
                {userId: user.id, shortUrlId, expirationTime: new Date().getTime()}
            )
            .getOne();
    }

    public getURLByLongURL = async (user: User, longURL: string): Promise<URL> => {
        return this.repository.createQueryBuilder()
            .where(
                "url.userId = :userId and " +
                "url.longURL = :longURL and " +
                "(expiration is null or expiration > :expirationTime)",
                {userId: user.id, longURL, expirationTime: new Date().getTime()}
            )
            .getOne();
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