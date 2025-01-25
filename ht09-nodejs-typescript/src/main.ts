import {App} from './app';
import {ExeptionFilter} from './error/exeption.filter';
import {ILogger} from './logger/logger.interface';
import {LoggerService} from './logger/logger.service';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';
import {UserModel} from './user/user.model';
import {CourseController} from "./course/course.controller";
import {CourseModel} from "./course/course.model";
import {CourseService} from "./course/course.service";
import {ConfigService} from "./config/config.service";
import {Container, ContainerModule, interfaces} from "inversify";
import {IExeptionFilter} from "./error/exeption.filter.interface";
import {TYPES} from "./types";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
    bind<UserController>(TYPES.UserController).to(UserController);
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
