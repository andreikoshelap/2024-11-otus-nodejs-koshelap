import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { LogMessage } from '../logger/logger.interface';
import { HTTPError } from '../error/http-error.class';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserController } from './interface/users.controller.interface';
import { UserService } from './users.service';

export class UserController extends BaseController<LogMessage> implements IUserController {
	private userService: UserService;
	constructor(logger: LoggerService<LogMessage>, userService: UserService) {
		super(logger);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
		this.userService = userService;
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		//  this.ok(res, 'login');
		next(new HTTPError(401, 'Authorization issue', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		console.log(' ' + body.email);

		if (!result) {
			return next(new HTTPError(422, 'That user already exist'));
		}
		this.ok(res, { email: result.email });
	}
}
