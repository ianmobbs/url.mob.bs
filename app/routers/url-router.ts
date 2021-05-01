import Router from '@koa/router';
import { ParameterizedContext } from 'koa';
import URLService from "../services/url-service";
import URLAlreadyExistsError from "../exception/url-already-exists-error";

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
        // Get all URLs
        this.router.get('/', async (ctx) => {
            ctx.body = {
                urls: await this.urlService.getAllURLsForUser(ctx.state.user)
            };
            ctx.status = 200
        });

        // Create new short URL
        this.router.post('/', async (ctx: ParameterizedContext) => {
            const longUrl: string = ctx.request.body.longUrl;
            const shortUrlId: string | undefined = ctx.request.body.urlId;
            const expiration: number | undefined = parseInt(ctx.request.body.expiration);
            if (!longUrl || !this.isValidUrl(longUrl)) {
                ctx.body = {
                    "error": "Please provide a valid long URL in the longUrl property of your request body"
                }
                ctx.status = 400
                return;
            }
            const expirationTime = new Date(expiration).getTime()
            const currentTime = new Date().getTime()
            if (expiration && expirationTime < currentTime) {
                ctx.body = {
                    "error": `Your expiration ${expirationTime} is ${currentTime - expirationTime}ms less than the current time ${new Date().getTime()}`
                }
                ctx.status = 400
                return;
            }

            try {
                const urlObj = await this.urlService.generateShortUrl(ctx.state.user, longUrl, shortUrlId, expiration)
                ctx.body = {
                    url: urlObj.shortUrlId
                }
                ctx.status = 200
            } catch (e) {
                if (e instanceof URLAlreadyExistsError) {
                    ctx.body = {
                        "error": `User ${ctx.state.user.email} has already shortened ${longUrl}`
                    }
                    ctx.status = 409
                } else {
                    console.log(e);
                    ctx.body = {
                        "error": e
                    }
                    ctx.status = 500
                }
            }
        });

        // Get the long URL for a shortened URL ID
        this.router.get('/:shortUrlId', async (ctx: ParameterizedContext) => {
            const shortUrlId = ctx.params.shortUrlId;
            if (!shortUrlId) {
                ctx.body = {
                    "error": "Please provide a short URL ID"
                }
                ctx.status = 400
                return;
            }

            const urlObj = await this.urlService.getLongUrl(ctx.state.user, shortUrlId);
            if (!urlObj) {
                ctx.body = {
                    "error": `Could not find URL with ID ${shortUrlId}`
                }
                ctx.status = 404
                return;
            }

            ctx.body = {
                url: urlObj.longURL
            }
            ctx.status = 200
        });

        this.router.delete('/:shortUrlId', async (ctx: ParameterizedContext) => {
            const shortUrlId = ctx.params.shortUrlId;
            if (!shortUrlId) {
                ctx.body = {
                    "error": "Please provide a short URL ID"
                }
                ctx.status = 400
                return;
            }

            const urlObj = await this.urlService.getLongUrl(ctx.state.user, shortUrlId);
            if (!urlObj) {
                ctx.body = {
                    "error": `Could not find URL with ID ${shortUrlId}`
                }
                ctx.status = 404
                return;
            }

            await this.urlService.deleteShortUrl(ctx.state.user, shortUrlId);
            ctx.body = {
                "message": `Deleted ${shortUrlId}`
            }
            ctx.status = 204
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