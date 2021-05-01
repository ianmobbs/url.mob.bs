import Router from '@koa/router';
import { ParameterizedContext } from 'koa';
import URLService from "../services/url-service";

export default class URLRouter {
    private router: Router;

    private urlService: URLService;

    constructor() {
        this.router = new Router();
        this.urlService = new URLService();
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }

    private setupRoutes = () => {
        // Create new short URL
        this.router.post('/', async (ctx: ParameterizedContext) => {
            const longUrl: string = ctx.request.body.longUrl;
            const shortUrlId: string | undefined = ctx.request.body.urlId;
            if (!longUrl || !this.isValidUrl(longUrl)) {
                ctx.body = {
                    "error": "Please provide a valid long URL in the longUrl property of your request body"
                }
                ctx.status = 400
                return;
            }

            const urlObj = await this.urlService.generateShortUrl(longUrl, shortUrlId)
            ctx.body = {
                url: urlObj.shortUrlId
            }
            ctx.status = 200
        });

        // Get the long URL for a shortened URL ID
        this.router.get('/:shortUrlId', async (ctx: ParameterizedContext) => {
            const shortUrlId = ctx.params.shortUrlId;
            if (!shortUrlId) {
                ctx.body = {
                    "error": "Please provide a short URL ID"
                }
                ctx.status = 400
            }

            const urlObj = await this.urlService.getLongUrl(shortUrlId);
            ctx.body = {
                url: urlObj.longURL
            }
            ctx.status = 200
        });
    }

    private isValidUrl = (text: string) => {
        try {
            const url = new URL(text);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
            return false;
        }
    }
}