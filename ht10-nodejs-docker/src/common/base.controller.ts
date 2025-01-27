import { Response, Router } from 'express';
import { IControllerRoute } from './interface/route.interface';
export { Router } from 'express';
import { LoggerService } from '../logger/logger.service';

export abstract class BaseController<T> {
	private readonly _router: Router;

	constructor(private logger: LoggerService<T>) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<U>(res: Response, code: number, message: U): Response {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<U>(res: Response, message: U): Response {
		return this.send<U>(res, 200, message);
	}

	public created(res: Response): Response {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
