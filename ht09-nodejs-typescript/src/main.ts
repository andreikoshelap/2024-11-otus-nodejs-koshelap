import {App} from './app';
import {ExceptionFilter} from './error/exeption.filter';
import {ILogger} from './logger/logger.interface';
import {LoggerService} from './logger/logger.service';
import {UserController} from './user/user.controller';
import {Container, ContainerModule, interfaces} from "inversify";
import {IExceptionFilter} from "./error/exception.filter.interface";
import {TYPES} from "./types";
import {IUserService} from "./user/interface/users.service.interface";
import {UserService} from "./user/user.service";
import {UserModel} from "./user/user.model";
import {ConfigService} from "./config/config.service";
import {CourseController} from "./course/course.controller";
import {ICourseService} from "./course/interface/course.service.interface";
import {CourseService} from "./course/course.service";
import {CourseModel} from "./course/course.model";
import {IConfigService} from "./config/interface/config.service.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<CourseController>(TYPES.CourseController).to(CourseController);
    bind<IUserService>(TYPES.UserService).to(UserService);
    bind<ICourseService>(TYPES.CourseService).to(CourseService);
    bind<UserModel>(TYPES.UserModel).to(UserModel);
    bind<CourseModel>(TYPES.CourseModel).to(CourseModel);
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
