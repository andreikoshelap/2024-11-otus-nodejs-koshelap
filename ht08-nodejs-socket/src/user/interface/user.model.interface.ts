import {User} from "../user.entity";
import {IUser} from "./user.entity.interface";

export interface IUserModel {
    createUser: (user: User) => void;
    findByEmail: (email: string) => void;
    getAllUsers: () => void;
    updateUser: (id: string, updateData: Partial<IUser>) => void;
    deleteUser: (id: string) => void
}
