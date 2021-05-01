import Router from '@koa/router';
import URLManager from "../managers/url-manager";

export default class RedirectRouter {
    private router: Router;
    private urlManager: URLManager;

    constructor() {
        this.router = new Router();
        this.urlManager = new URLManager();
    }

    public init = (): Router => {
        this.setupRoutes()
        return this.router
    }

    private setupRoutes = () => {
        this.router.get('/:shortUrlId', async (ctx) => {
            const shortUrlId = ctx.params.shortUrlId;
            if (!shortUrlId) {
                ctx.body = {
                    "error": "Please provide a short URL ID"
                }
                ctx.status = 400
                return
            }

            const urlObj = await this.urlManager.getURLByShortIDForRedirect(shortUrlId);
            if (!urlObj) {
                ctx.body = {
                    "error": "Please provide a valid short URL ID"
                }
                ctx.status = 400
                return
            }

            return ctx.response.redirect(urlObj.longURL);
        })
    }
}