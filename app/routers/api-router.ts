import Router from '@koa/router';
import HealthcheckRouter from "./healthcheck-router";
import URLRouter from "./url-router";
import AccountsRouter from "./accounts-router";
import AnalyticsRouter from "./analytics-router";

export default class ApiRouter {

    private router: Router;

    private healthcheckRouter: HealthcheckRouter;
    private urlRouter: URLRouter;
    private accountsRouter: AccountsRouter;
    private analyticsRouter: AnalyticsRouter;

    constructor() {
        this.router = new Router();
        this.healthcheckRouter = new HealthcheckRouter();
        this.urlRouter = new URLRouter();
        this.accountsRouter = new AccountsRouter();
        this.analyticsRouter = new AnalyticsRouter();
    }

    private setupRoutes = () => {
        this.router.use('/status', this.healthcheckRouter.init().routes());
        this.router.use('/urls', this.urlRouter.init().routes());
        this.router.use('/accounts', this.accountsRouter.init().routes());
        this.router.use('/analytics', this.analyticsRouter.init().routes());
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }
}