import { App } from './app';
import { LogMessage } from './logger/logger';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';

async function bootstrap() {
    const logger = new LoggerService<LogMessage>();
	const app = new App(logger, new UserController(logger));
	await app.init();
}

bootstrap();