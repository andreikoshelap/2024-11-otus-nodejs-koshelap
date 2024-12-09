export class CourseDto {
	name: string;
	teacherName: string;

	constructor(name: string, teacherName: string) {
		this.name = name;
		this.teacherName = teacherName;
	}
}
