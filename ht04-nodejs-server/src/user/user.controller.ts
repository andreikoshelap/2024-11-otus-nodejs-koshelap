import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from "../logger/logger.service";
import { LogMessage } from "../logger/logger";


export class UserController extends BaseController<LogMessage>{

    constructor(logger : LoggerService<LogMessage>) {
		super(logger);
        this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		])
	}

    login(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'login');
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register');
	}
}