import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { LogMessage } from '../logger/logger.interface';
import { HTTPError } from '../error/http-error.class';

export class UserController extends BaseController<LogMessage> {
    constructor(logger: LoggerService<LogMessage>) {
        super(logger);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login },
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
      //  this.ok(res, 'login');
        next(new HTTPError(401, "Authorization issue"));
    }

    register(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, "Something happens"));
    }
}
