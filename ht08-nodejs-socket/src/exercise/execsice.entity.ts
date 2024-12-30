import { Course } from '../course/course.entity';
import { User } from '../user/user.entity';

export class Exercise {
	private _name: string;
	private _course: Course;
	private _date: Date;
	private students: User[];

	constructor(name: string, course: Course, date: Date, students: User[]) {
		this._name = name;
		this._course = course;
		this._date = date;
		this.students = students;
	}
}
