import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { Server } from 'http';
import { ExeptionFilter } from './error/exeption.filter';
import { LogMessage } from './logger/logger.interface';
import { UserController } from './user/user.controller';
import { json } from 'body-parser';
import { Database } from './database/database.service';
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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
		const options = {
			definition: {
				openapi: "3.0.0",
				info: {
					title: "Library API",
					version: "1.0.0",
					description: "A simple Express Library API",
					termsOfService: "http://example.com/terms/",
					contact: {
						name: "API Support",
						url: "http://www.example.com/support",
						email: "support@example.com",
					},
				},
				servers: [
					{
						url: "https://nodejs-swagger-api.vercel.app/",
						description: "My API Documentation",
					},
				],
			},
			// This is to call all the file
			apis: ["src/**/*.js"],
		};
		const specs = swaggerJsDoc(options);
		const CSS_URL =
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
		this.app.use(
			"/api-docs",
			swaggerUI.serve,
			swaggerUI.setup(specs, { customCssUrl: CSS_URL })
		);
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
