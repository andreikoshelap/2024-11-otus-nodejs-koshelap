import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { Server } from 'http';
import { ExeptionFilter } from './error/exeption.filter';
import { LogMessage } from './logger/logger.interface';
import { UserController } from './user/user.controller';
import { json } from 'body-parser';
import { Database } from './database/database.service';

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
		exeptionFilter: ExeptionFilter,
	) {
		const db = new Database('mongodb://localhost:27017/otus');
		db.connect();
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.server = this.app.listen(this.port);
		this.userController = userController;
		this.exceptionFilter = exeptionFilter;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}
}
