export class CourseDto {
	id: string;
	name: string;
	teacherName: string;

	constructor(id: string, name: string, teacherName: string) {
		this.id = id;
		this.name = name;
		this.teacherName = teacherName;
	}
}
