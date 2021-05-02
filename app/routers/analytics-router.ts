import Router from '@koa/router';
import AnalyticsService from "../services/analytics-service";
import URLService from "../services/url-service";

export default class AnalyticsRouter {
    private router: Router;
    private analyticsService: AnalyticsService;
    private urlService: URLService;

    constructor() {
        this.router = new Router();
        this.analyticsService = new AnalyticsService();
        this.urlService = new URLService();
    }

    public init = (): Router => {
        this.setupRoutes()
        return this.router;
    }

    private setupRoutes = () => {
        // Get overall analytics
        this.router.get('/', async (ctx) => {
            ctx.body = {
                "clicks": await this.analyticsService.getOverallAnalytics(ctx.state.user)
            }
            ctx.status = 200
        });

        // Get analytics for individual URLs
        this.router.get('/:shortUrlId', async (ctx) => {
            const shortUrlId = ctx.request.params.shortUrlId
            if (!shortUrlId) {
                ctx.body = {
                    "error": "Please provide a short URL ID"
                }
                ctx.status = 400
                return
            }
            const urlObj = await this.urlService.getLongUrl(ctx.state.user, shortUrlId)
            if (!urlObj) {
                ctx.body = {
                    "error": "Please provide a valid short URL ID"
                }
                ctx.status = 400
            }

            ctx.body = {
                "clicks": await this.analyticsService.getClicksForURL(ctx.state.user, urlObj)
            }
            ctx.status = 200
        });
    }
}