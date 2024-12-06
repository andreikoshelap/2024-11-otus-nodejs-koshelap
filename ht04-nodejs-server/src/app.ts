import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { Server } from 'http';
import { UserController } from './user/user.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
    logger: LoggerService<App>;
    userController: UserController; 
    

	constructor(
        logger: LoggerService<App>,
        userController: UserController
    ) {
		this.app = express();
		this.port = 8000;
        this.server = this.app.listen(this.port);
        this.logger = logger;
        this.userController = userController;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	public async init() {
		this.useRoutes();
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
        
	}
}