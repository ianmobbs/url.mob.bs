import AccountsManager from "../managers/accounts-manager";
import { ParameterizedContext } from 'koa';
import AuthService from "../services/auth-service";

export default class UserAuth {
    private accountsManager: AccountsManager;
    private authService: AuthService;

    constructor() {
        this.accountsManager = new AccountsManager();
        this.authService = new AuthService();
    }

    getMiddleware = () => {
        return async (ctx: ParameterizedContext, next) => {
            const allowlistedPaths = [
                '/api/accounts/'
            ]

            if (allowlistedPaths.includes(ctx.request.url)) {
                await next();
                return;
            }


            // We accept authorization using the standard `Authorization: Basic base64(email:password)` scheme
            const authorizationHeader = ctx.get('Authorization')
            const [email, password] = this.authService.fromBase64(authorizationHeader.split(" ")[1]).split(':')
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
            } else {
                ctx.state.user = userObj;
                await next();
            }
        }
    }
}