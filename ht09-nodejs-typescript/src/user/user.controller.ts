import {BaseController} from '../common/base.controller';
import {NextFunction, Request, Response} from 'express';
import {LoggerService} from '../logger/logger.service';
import {LogMessage} from '../logger/logger.interface';
import {HTTPError} from '../error/http-error.class';
import {UserLoginDto} from './dto/user-login.dto';
import {UserRegisterDto} from './dto/user-register.dto';
import {IUserController} from './interface/users.controller.interface';
import {UserService} from './user.service';
import {ValidateMiddleware} from '../common/validate.middleware';
import {sign} from "jsonwebtoken";
import {IConfigService} from "../config/interface/config.service.interface";
import {GuardMiddleware} from "../common/guard.middleware";

export class UserController extends BaseController<LogMessage> implements IUserController {
    private userService: UserService;
    private configService: IConfigService;

    constructor(logger: LoggerService<LogMessage>, userService: UserService, configService: IConfigService) {
        super(logger);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)],
            },
            {
                path: '/login',
                method: 'post',
                func: this.login,
                middlewares: [new ValidateMiddleware(UserLoginDto)],
            },
            {
                path: '/info',
                method: 'post',
                func: this.info,
                middlewares: [new GuardMiddleware()],
            },
        ]);
        this.userService = userService;
        this.configService = configService;
    }

    async login(
        req: Request<object, object, UserLoginDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const result = await this.userService.validateUser(req.body);
        if (!result) {
            return next(new HTTPError(401, 'Authorization error', 'login'));
        }
        const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
        this.ok(res, {jwt});
    }

    async register(
        {body}: Request<object, object, UserRegisterDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const result = await this.userService.createUser(body);

        if (!result) {
            return next(new HTTPError(422, 'That user already exist'));
        }
        this.ok(res, {email: result.email});
    }

    async info(req: Request<object, object, { email: string }>, res: Response, next: NextFunction): Promise<void> {

        try {
            const email = req.body.email;
            if (!email) {
                res.status(400).send({message: 'Email is required'});
            }
            const userInfo = await this.userService.getUserInfo(email);

            if (userInfo) {
                this.ok(res, {email: userInfo.email, id: userInfo.id});
            } else {
                res.status(404).send({message: 'User not found'});
            }
        } catch (error) {
            next(error);
        }
    }

    private signJWT(email: string, secret: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            sign(
                {
                    email,
                    iat: Math.floor(Date.now() / 1000),
                },
                secret,
                {
                    algorithm: 'HS256',
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token as string);
                },
            );
        });
    }
}
