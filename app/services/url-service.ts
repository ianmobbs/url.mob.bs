export default class URLService {
    constructor() {
    }

    public generateShortUrl = (longUrl: string, shortUrlId?: string): string => {
        if (shortUrlId) {
            return shortUrlId;
        } else {
            return this.generateId();
        }
    }

    public getLongUrl = (shortUrlId: string): string => {
        return this.generateId();
    }

    private generateId = (len: number = 8): string => {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}