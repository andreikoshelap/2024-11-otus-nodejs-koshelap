import {ICourseService} from "./interface/course.service.interface";
import {CourseDto} from "./dto/course.dto";
import {Course} from "./course.entity";
import {CourseModel} from "./course.model";
import {ICourse} from "./interface/course.entity.interface";

export class CourseService implements ICourseService {

    private courseModel: CourseModel;

    constructor( courseModel: CourseModel) {
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
