import Router from '@koa/router';
import URLManager from "../managers/url-manager";
import ClickManager from "../managers/click-manager";

export default class RedirectRouter {
    private router: Router;
    private urlManager: URLManager;
    private clickManager: ClickManager;

    constructor() {
        this.router = new Router();
        this.urlManager = new URLManager();
        this.clickManager = new ClickManager();
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

            const urlObj = await this.urlManager.getURLByShortID(shortUrlId);
            if (!urlObj) {
                ctx.body = {
                    "error": "Please provide a valid short URL ID"
                }
                ctx.status = 400
                return
            }

            this.clickManager.addClick(urlObj);
            return ctx.response.redirect(urlObj.longURL);
        })
    }
}