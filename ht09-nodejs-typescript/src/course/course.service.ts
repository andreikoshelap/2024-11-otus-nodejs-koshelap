import {ICourseService} from "./interface/course.service.interface";
import {CourseDto} from "./dto/course.dto";
import {Course} from "./course.entity";
import {CourseModel} from "./course.model";
import {ICourse} from "./interface/course.entity.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {UserModel} from "../user/user.model";
import {ICourseModel} from "./interface/course.model.interface";

@injectable()
export class CourseService implements ICourseService {

    constructor( @inject(TYPES.CourseModel) private courseModel: CourseModel
    ) {
        this.courseModel = courseModel;
    }
    async createCourse(dto: CourseDto): Promise<ICourse | null> {
        const newCourse = new Course(dto.teacherName,  dto.name);
        return this.courseModel.create(newCourse);
    }

    async updateCourse(dto: CourseDto): Promise<ICourse | null> {
        const newCourse = new Course(dto.teacherName,  dto.name);
        return null;
    }



}
