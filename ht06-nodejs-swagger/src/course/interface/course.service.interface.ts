import { CourseDto } from '../dto/course.dto';
import {ICourse} from "./course.entity.interface";

export interface ICourseService {
	createCourse: (dto: CourseDto) => Promise<ICourse | null>;
	updateCourse: (dto: CourseDto) => Promise<ICourse | null>;
}
