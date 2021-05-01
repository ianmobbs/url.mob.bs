import Koa from 'koa';
import Router from '@koa/router';
import ApiRouter from "./app/routers/api-router";

const PORT = 3000;

export class App {
    private app: Koa;
    private rootRouter: Router;
    private apiRouter: ApiRouter;

    constructor() {
        this.app = new Koa();
        this.rootRouter = new Router();
        this.apiRouter = new ApiRouter()

        this.setupRoutes();
        this.app.use(this.log);
        this.app.use(this.rootRouter.routes());
    }

    public listen = () => {
        console.log(`Now listening on ${PORT}`)
        this.app.listen(PORT);
    }

    private log = async (ctx, next) => {
        const startTime = new Date().getTime();
        await next();
        const endTime = new Date().getTime();
        console.log(`${ctx.request.method} ${ctx.request.url}\t${endTime - startTime}ms`);
    }

    private setupRoutes = () => {
        this.rootRouter.use('/api', this.apiRouter.init().routes());
    }
}

const app = new App();
app.listen();