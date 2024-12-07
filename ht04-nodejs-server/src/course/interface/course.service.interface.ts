import { Course } from '../course.entity';
import { CourseDto } from '../dto/course.dto';

export interface ICourseService {
	createCourse: (dto: CourseDto) => Promise<Course | null>;
	updateCourse: (dto: CourseDto) => Promise<Course | null>;
}
