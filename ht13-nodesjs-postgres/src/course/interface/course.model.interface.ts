import {Course} from "../course.entity";
import {ICourse} from "./course.entity.interface";

export interface ICourseModel {
    create: (course: Course) => void;
    update: (id: string, updateData: Partial<ICourse>) => void;
}
