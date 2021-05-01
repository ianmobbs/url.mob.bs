import Koa from 'koa';
import Router from '@koa/router';
import ApiRouter from "./app/routers/api-router";
import bodyParser from 'koa-bodyparser';
import 'reflect-metadata';
import UserAuth from "./app/middleware/user-auth";
import RedirectRouter from "./app/routers/redirect-router";

const PORT = 3000;

export class App {
    private app: Koa;
    private rootRouter: Router;
    private apiRouter: ApiRouter;
    private redirectRouter: RedirectRouter;

    constructor() {
        this.app = new Koa();
        this.rootRouter = new Router();
        this.apiRouter = new ApiRouter();
        this.redirectRouter = new RedirectRouter();

        this.setupRoutes();
        this.app.use(bodyParser());
        this.app.use(this.log);
        this.app.use(this.redirectRouter.init().routes()); // Need to add redirect router before user auth middleware
        this.app.use(new UserAuth().getMiddleware());
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
        console.log(`${ctx.response.status}\t${ctx.request.method} ${ctx.request.url}\t${endTime - startTime}ms`);
    }

    private setupRoutes = () => {
        this.rootRouter.use('/api', this.apiRouter.init().routes());
    }
}

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

const app = new App();
app.listen();