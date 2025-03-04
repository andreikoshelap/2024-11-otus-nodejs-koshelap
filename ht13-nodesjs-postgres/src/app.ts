import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { Server } from 'http';
import { ExeptionFilter } from './error/exeption.filter';
import { LogMessage } from './logger/logger.interface';
import { UserController } from './user/user.controller';
import { json } from 'body-parser';
import { Database } from './database/database.service';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from './annotation/swaggerConfig';
import {CourseController} from "./course/course.controller";
import {IConfigService} from "./config/interface/config.service.interface";
import {AuthMiddleware} from "./common/auth.middleware";

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService<LogMessage>;
	userController: UserController; 
	courseController: CourseController;
	exceptionFilter: ExeptionFilter;
	configService: IConfigService;
	constructor(
		logger: LoggerService<LogMessage>,
		userController: UserController,
		courseController: CourseController,
		exeptionFilter: ExeptionFilter,
		configService: IConfigService,
	) {
		// const db = new Database('mongodb://localhost:27017/otus');
		db.connect();
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.server = this.app.listen(this.port);
		this.userController = userController;
		this.courseController = courseController;
		this.exceptionFilter = exeptionFilter;
		this.configService = configService;
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(
			"/api-docs",
			swaggerUI.serve,
			swaggerUI.setup(swaggerSpec)
		);
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/courses', this.courseController.router);
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
