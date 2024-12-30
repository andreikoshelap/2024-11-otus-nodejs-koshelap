import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../user.entity';
import { IUser } from './user.entity.interface';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<IUser | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
