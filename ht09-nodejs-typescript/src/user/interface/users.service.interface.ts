import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { IUser } from './user.entity.interface';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<IUser | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<IUser | null>;
}
