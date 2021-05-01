import Router from '@koa/router';
import { HealthcheckRouter } from "./healthcheck-router";

export default class ApiRouter {

    private router: Router;

    private healthcheckRouter: HealthcheckRouter;

    constructor() {
        this.router = new Router();
        this.healthcheckRouter = new HealthcheckRouter();
    }

    private setupRoutes = () => {
        this.router.use('/status', this.healthcheckRouter.init().routes());
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }
}