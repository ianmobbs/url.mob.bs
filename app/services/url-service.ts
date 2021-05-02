import URLManager from "../managers/url-manager";
import URL from "../model/entities/URL";
import User from "../model/entities/User";
import URLAlreadyExistsError from "../exception/url-already-exists-error";

export default class URLService {
    private urlManager: URLManager;

    constructor() {
        this.urlManager = new URLManager();
    }

    public getAllURLsForUser = async (user: User): Promise<URL[]> => {
        return this.urlManager.getAllURLsForUser(user);
    }

    public generateShortUrl = async (user: User, longUrl: string, shortUrlId?: string, expiration?: number): Promise<URL> => {
        const shortId = shortUrlId ?? this.generateId();
        const existingUrl = await this.urlManager.getURLByLongURL(user, longUrl);
        if (existingUrl) {
            throw new URLAlreadyExistsError(`URL ${longUrl} already exists`)
        }
        return this.urlManager.createUrl(user, shortId, longUrl, expiration);
    }

    public getLongUrl = async (user: User, shortUrlId: string): Promise<URL> => {
        return this.urlManager.getURLByShortIDAndUser(user, shortUrlId);
    }

    public deleteShortUrl = async (user: User, shortUrlId: string): Promise<URL> => {
        return this.urlManager.deleteUrl(user, shortUrlId)
    }

    private generateId = (len: number = 8): string => {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}