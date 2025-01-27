import {Course} from "../course.entity";
import {ICourse} from "./course.entity.interface";
import {IUser} from "../../user/interface/user.entity.interface";

export interface ICourseModel {
    create: (course: Course) => Promise<ICourse | null>;
    update: (id: string, updateData: Partial<ICourse>) => void;
}
