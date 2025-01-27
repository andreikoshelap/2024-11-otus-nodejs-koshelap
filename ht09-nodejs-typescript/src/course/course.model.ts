import mongoose, {Schema, Model} from 'mongoose';
import {ICourseModel} from "./interface/course.model.interface";
import {ICourse} from "./interface/course.entity.interface";
import {injectable} from "inversify";

const userSchema = new Schema<ICourse>(
    {
        id: {type: String, required: true, unique: true},
        name: {type: String, required: true},
    },
    {
        timestamps: true,
    },
);

@injectable()
export class CourseModel implements ICourseModel {
    private model: Model<ICourse>;

    constructor() {
        this.model = mongoose.model<ICourse>('courses', userSchema);
    }

    async create(courseData: Partial<ICourse>): Promise<ICourse> {
        if ( !courseData.name ) {
            throw new Error('Missing required fields:  name');
        }
        const course = new this.model({
            name: courseData.name,
            teacher: courseData.teacher,
        });

        return await course.save();
    }


    async update(id: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
        const existedCourse = await this.model.findById(id);
        if (!existedCourse) {
            return null;
        }
        // const newCourse = new Course(existedCourse.teacher, existedCourse.name);
        const course = new this.model({
            name: updateData.name,
            teacher: updateData.teacher,
        });

        return await course.updateOne();
    }


}
