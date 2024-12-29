import { App } from './app';
import { ExeptionFilter } from './error/exeption.filter';
import { LogMessage } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModel } from './user/user.model';
import {CourseController} from "./course/course.controller";
import {CourseModel} from "./course/course.model";
import {CourseService} from "./course/course.service";

async function bootstrap(): Promise<void> {
	const logger = new LoggerService<LogMessage>();
	const userService = new UserService( new UserModel());
	const couseService = new CourseService( new CourseModel());
	const app = new App(logger, new UserController(logger, userService), new CourseController(logger, couseService), new ExeptionFilter(logger));
	await app.init();
}

bootstrap();
