import Router from '@koa/router';
import {UserService} from "../services/user-service";
import UserAlreadyExistsError from "../exception/user-already-exists-error";
import AccountsManager from "../managers/accounts-manager";
import AuthService from "../services/auth-service";

const MILLISECONDS_IN_DAY = 86400;

export default class AccountsRouter {
    private router: Router;
    private userService: UserService;
    private accountsManager: AccountsManager;
    private authService: AuthService;

    constructor() {
        this.router = new Router();
        this.userService = new UserService();
        this.accountsManager = new AccountsManager();
        this.authService = new AuthService();
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
            const passwordConfirmation = ctx.request.body.passwordConfirmation;
            if (!email || !password) {
                ctx.response.body = {
                    "error": "Please provide email and password in your request."
                }
                ctx.status = 400;
                return;
            }
            if (passwordConfirmation && passwordConfirmation != password) {
                ctx.response.body = {
                    "error": "Your password and password confirmation did not match."
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
                "message": `Successfully created user ${email}. Please log in now.`
            }
            ctx.response.status = 201

        });

        this.router.post('/login', async (ctx) => {
            const email = ctx.request.body.email;
            const password = ctx.request.body.password;
            if (!email || !password) {
                ctx.body = {
                    "error": "Please authenticate using the Authorization header."
                }
                ctx.status = 401
                return;
            }

            const userObj = await this.accountsManager.getUser(email);
            if (!userObj || !this.authService.checkPassword(password, userObj.passwordHash)) {
                ctx.body = {
                    "error": "Please authenticate using the Authorization header."
                }
                ctx.status = 401
                return
            }


            ctx.cookies.set(
                'authCookie',
                this.generateLoginCookie(email, password),
                {expires: MILLISECONDS_IN_DAY + Date.now()}
            );
            ctx.body = {
                "message": `Successfully logged ${email} in`
            }
            ctx.status = 200
        });

        return this.router;
    }

    private generateLoginCookie = (email: string, password: string): string => {
        return this.authService.toBase64(`${email}:${password}`)
    }
}