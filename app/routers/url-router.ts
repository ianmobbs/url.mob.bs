import Router from '@koa/router';
import { ParameterizedContext } from 'koa';

export default class URLRouter {
    private router: Router;

    constructor() {
        this.router = new Router();
    }

    public init = (): Router => {
        this.setupRoutes();
        return this.router;
    }

    private setupRoutes = () => {
        // Create new short URL
        this.router.post('/', (ctx: ParameterizedContext) => {
            ctx.body = {
                "url": ctx.request.body.urlID ?? this.generateId()
            }
        });

        // Get the long URL for a shortened URL ID
        this.router.get('/:shortUrlID', (ctx: ParameterizedContext) => {
            ctx.body = {
                "url": ctx.params.shortUrlID
            }
        });
    }

    private generateId = (len: number = 8): string => {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}