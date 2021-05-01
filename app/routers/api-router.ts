import Router from '@koa/router';
import HealthcheckRouter from "./healthcheck-router";
import URLRouter from "./url-router";
import AccountsRouter from "./accounts-router";

export default class ApiRouter {

    private router: Router;

    private healthcheckRouter: HealthcheckRouter;
    private urlRouter: URLRouter;
    private accountsRouter: AccountsRouter;

    constructor() {
        this.router = new Router();
        this.healthcheckRouter = new HealthcheckRouter();
        this.urlRouter = new URLRouter();
        this.accountsRouter = new AccountsRouter();
    }

    private setupRoutes = () => {
        this.router.use('/status', this.healthcheckRouter.init().routes());
        this.router.use('/urls', this.urlRouter.init().routes());
        this.router.use('/accounts', this.accountsRouter.init().routes());
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }
}