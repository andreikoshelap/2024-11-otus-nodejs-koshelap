import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { Server } from 'http';
import { ExeptionFilter } from './error/exeption.filter';
import { LogMessage } from './logger/logger.interface';
import { UserController } from './user/user.controller';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService<LogMessage>;
    userController: UserController;
    exceptionFilter: ExeptionFilter;
    constructor(
        logger: LoggerService<LogMessage>,
        userController: UserController,
		exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.server = this.app.listen(this.port);
        this.userController = userController;
        this.exceptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        // this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
