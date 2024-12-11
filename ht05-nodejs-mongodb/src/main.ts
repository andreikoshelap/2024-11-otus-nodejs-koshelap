import { App } from './app';
import { ExeptionFilter } from './error/exeption.filter';
import { LogMessage } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigService } from './config/config.service';
import { UserModel } from './user/user.model';

async function bootstrap(): Promise<void> {
	const logger = new LoggerService<LogMessage>();
	const userService = new UserService( new UserModel());
	const app = new App(logger, new UserController(logger, userService), new ExeptionFilter(logger));
	await app.init();
}

bootstrap();
