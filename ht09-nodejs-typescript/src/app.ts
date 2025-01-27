import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UserController } from './user/user.controller';
import { json } from 'body-parser';
import { Database } from './database/database.service';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from './annotation/swaggerConfig';
import {CourseController} from "./course/course.controller";
import {IConfigService} from "./config/interface/config.service.interface";
import {AuthMiddleware} from "./common/auth.middleware";
import 'reflect-metadata';
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {IExceptionFilter} from "./error/exception.filter.interface";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.CourseController) private courseController: CourseController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		const db = new Database('mongodb://localhost:27017/otus');
		db.connect();
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.server = this.app.listen(this.port);
		this.userController = userController;
		this.courseController = courseController;
		this.exceptionFilter = exceptionFilter;
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
