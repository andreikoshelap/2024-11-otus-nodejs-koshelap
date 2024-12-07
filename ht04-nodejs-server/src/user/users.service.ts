import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './interface/users.service.interface';

export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name, password, false);
		await newUser.setPassword(password);
		const existingUser: User | null = null;
		if (existingUser) {
			return newUser;
		}
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
