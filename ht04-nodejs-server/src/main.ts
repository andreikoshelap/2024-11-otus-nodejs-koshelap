import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';

async function bootstrap() {
    const logger = new LoggerService<App>();
	const app = new App(logger, new UserController());
	await app.init();
}

bootstrap();