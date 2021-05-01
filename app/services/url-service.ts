import URLManager from "../managers/url-manager";
import URL from "../model/entities/URL";
import User from "../model/entities/User";

export default class URLService {
    private urlManager: URLManager;

    constructor() {
        this.urlManager = new URLManager();
    }

    public generateShortUrl = async (user: User, longUrl: string, shortUrlId?: string): Promise<URL> => {
        const shortId = shortUrlId ?? this.generateId();
        return this.urlManager.createUrl(user, shortId, longUrl);
    }

    public getLongUrl = async (user: User, shortUrlId: string): Promise<URL> => {
        return this.urlManager.getUrl(user, shortUrlId);
    }

    private generateId = (len: number = 8): string => {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}