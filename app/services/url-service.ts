import URLManager from "../managers/url-manager";
import URL from "../model/entities/URL";

export default class URLService {
    private urlManager: URLManager;

    constructor() {
        this.urlManager = new URLManager();
    }

    public generateShortUrl = async (longUrl: string, shortUrlId?: string): Promise<URL> => {
        const shortId = shortUrlId ?? this.generateId();
        const urlObj = await this.urlManager.createUrl(shortId, longUrl);
        console.log(`Created ${JSON.stringify(urlObj)}`)
        return urlObj
    }

    public getLongUrl = async (shortUrlId: string): Promise<URL> => {
        const urlObj = await this.urlManager.getUrl(shortUrlId);
        console.log(`Received ${JSON.stringify(urlObj)}`)
        return urlObj;
    }

    private generateId = (len: number = 8): string => {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}