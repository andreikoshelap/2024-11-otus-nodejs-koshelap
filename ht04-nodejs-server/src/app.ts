import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { Server } from 'http';
import { UserController } from './user/user.controller';
import { LogMessage } from './logger/logger';

export class App {
	app: Express;
	server!: Server;
	port: number;
    logger: LoggerService<LogMessage>;
    userController: UserController; 
    

	constructor(
        logger: LoggerService<LogMessage>,
        userController: UserController
    ) {
		this.app = express();
		this.port = 8000;
        this.logger = logger;
        this.userController = userController;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	public async init() {
		this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
        
	}
}