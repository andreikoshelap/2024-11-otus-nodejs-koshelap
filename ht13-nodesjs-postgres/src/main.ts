import {App} from './app';
import {ExeptionFilter} from './error/exeption.filter';
import {LogMessage} from './logger/logger.interface';
import {LoggerService} from './logger/logger.service';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';
import {UserModel} from './user/user.model';
import {CourseController} from "./course/course.controller";
import {CourseModel} from "./course/course.model";
import {CourseService} from "./course/course.service";
import {ConfigService} from "./config/config.service";

async function bootstrap(): Promise<void> {
    const logger = new LoggerService<LogMessage>();
    const userService = new UserService(new UserModel());
    const courseService = new CourseService(new CourseModel());
    const configService = new ConfigService(logger);
    const app = new App(logger, new UserController(logger, userService, configService),
        new CourseController(logger, courseService),
        new ExeptionFilter(logger),
        configService);
    await app.init();
}

bootstrap();
