import { Response, Router } from 'express';
import { IControllerRoute } from './route.interface';
export { Router } from 'express';
import { LoggerService } from '../logger/logger.service';

export abstract class BaseController<T> {
  private readonly _router: Router;

  constructor(private logger: LoggerService<T>) {
    this._router = Router();
  }

  // Геттер для маршрутизатора
  get router(): Router {
    return this._router;
  }

  // Метод для отправки ответа с JSON
  public send<U>(res: Response, code: number, message: U): Response {
    res.type('application/json');
    return res.status(code).json(message);
  }

  // Метод для отправки успешного ответа (200 OK)
  public ok<U>(res: Response, message: U): Response {
    return this.send<U>(res, 200, message);
  }

  // Метод для отправки ответа о создании ресурса (201 Created)
  public created(res: Response): Response {
    return res.sendStatus(201);
  }

  // Метод для привязки маршрутов
  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}` as T); // Логируем сообщение
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
