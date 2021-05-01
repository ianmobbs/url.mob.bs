import Router from '@koa/router';
import HealthcheckRouter from "./healthcheck-router";
import URLRouter from "./url-router";

export default class ApiRouter {

    private router: Router;

    private healthcheckRouter: HealthcheckRouter;
    private urlRouter: URLRouter;

    constructor() {
        this.router = new Router();
        this.healthcheckRouter = new HealthcheckRouter();
        this.urlRouter = new URLRouter();
    }

    private setupRoutes = () => {
        this.router.use('/status', this.healthcheckRouter.init().routes());
        this.router.use('/urls', this.urlRouter.init().routes());
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }
}