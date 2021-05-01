import Router from '@koa/router';
import {UserService} from "../services/user-service";
import UserAlreadyExistsError from "../exception/user-already-exists-error";

export default class AccountsRouter {
    private router: Router;
    private userService: UserService;

    constructor() {
        this.router = new Router();
        this.userService = new UserService();
    }

    public init = (): Router => {
        this.setupRoutes()
        return this.router;
    }

    private setupRoutes = () => {
        // Create user
        this.router.post('/', async (ctx) => {
            const email = ctx.request.body.email;
            const password = ctx.request.body.password;
            if (!email || !password) {
                ctx.response.body = {
                    "error": "Please provide email and password in your POST request."
                }
                ctx.status = 400;
                return;
            }

            try {
                await this.userService.createUser(email, password);
            } catch (e) {
                if (e instanceof UserAlreadyExistsError) {
                    ctx.response.body = {
                        "error": "There is already a user with that email."
                    }
                    ctx.status = 409
                    return;
                } else {
                    console.log(e);
                    ctx.response.body = {
                        "error": e
                    }
                    ctx.status = 500
                    return;
                }
            }
            ctx.response.body = {
                "message": `Successfully created user ${email}`
            }
            ctx.response.status = 201

        })

        // Get user
        this.router.get('/:userId', async (ctx) => {

        });

        return this.router;
    }
}