import {BaseController} from '../common/base.controller';
import {LogMessage} from '../logger/logger.interface';
import {ICourseController} from "./interface/course.controller.interface";
import {LoggerService} from "../logger/logger.service";
import {CourseService} from "./course.service";
import {ValidateMiddleware} from "../common/validate.middleware";
import {CourseDto} from "./dto/course.dto";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../error/http-error.class";

export class CourseController extends BaseController<LogMessage> implements ICourseController {

    private courseService: CourseService;

    constructor(logger: LoggerService<LogMessage>, courseService: CourseService) {
        super(logger);
        this.bindRoutes([
            {
                path: '/new',
                method: 'post',
                func: this.new,
                middlewares: [new ValidateMiddleware(CourseDto)],
            },
            {
                path: '/update',
                method: 'post',
                func: this.update,
                middlewares: [new ValidateMiddleware(CourseDto)],
            },
        ]);
        this.courseService = courseService;
    }

    async new({body}: Request<object, object, CourseDto>,
              res: Response,
              next: NextFunction,): Promise<void> {
        const result = await this.courseService.createCourse(body);

        if (!result) {
            return next(new HTTPError(400, 'That course already exist'));
        }
        this.ok(res, {email: result.name});

    }

    async update({body}: Request<object, object, CourseDto>,
                 res: Response,
                 next: NextFunction,): Promise<void> {
        const result = await this.courseService.updateCourse(body);

        if (!result) {
            return next(new HTTPError(400, 'That course already exist'));
        }
        this.ok(res, {email: result.name});
    }
}
