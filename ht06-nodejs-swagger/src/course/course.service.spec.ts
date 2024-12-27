import {ICourseModel} from "./interface/course.model.interface";
import {CourseDto} from "./dto/course.dto";
import {Course} from "./course.entity";
import {ICourse} from "./interface/course.entity.interface";


const courseModelMock: ICourseModel = {
    update: jest.fn(),
    create: jest.fn(),
};
jest.mock('./course.service');
let courseServiceMock = require('./course.service');

let createdCourse: CourseDto | null;
beforeAll(() => {

});

describe('User Service', () => {
    it('create', async () => {
        courseServiceMock = jest.fn().mockImplementationOnce(
            (course: Course): ICourse => <ICourse>({
                name: course.name,
                teacher: course.teacher,
            }),
        );
        createdCourse =  await courseServiceMock.createUser({
            name: 'NodeJs',
        });
        expect(createdCourse?.id).toEqual(1);
    });


    it('course', async () => {
        const res = await courseServiceMock.update({
            // name: createdCourse.name,
            // teacher: createdCourse.teacher,
        });
        expect(res).toBeFalsy();
    });
});
