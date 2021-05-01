import Router from '@koa/router';
import { ParameterizedContext } from 'koa';

export class HealthcheckRouter {
    private router: Router;

    constructor() {
        this.router = new Router();
    }

    private setupRoutes = () => {
        this.router.get('/', (ctx: ParameterizedContext) => {
            ctx.body = {
                "status": "ok"
            }
        });
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }
}