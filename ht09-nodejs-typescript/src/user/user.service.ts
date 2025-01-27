import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './interface/users.service.interface';
import { UserModel } from './user.model';
import { IUser } from './interface/user.entity.interface';
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export class UserService implements IUserService {
	constructor(
		// @inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserModel) private userModel: UserModel,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<IUser | null> {

		const newUser = new User( email, name, password, false);
		await newUser.setPassword(password);
		const existedUser = await this.userModel.findByEmail(email);
		if (existedUser) {
			return null;
		}
		console.log(`email ${newUser.email} ${newUser.name} ${newUser.password}`);
		return this.userModel.createUser(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userModel.findByEmail(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser.email, existedUser.name, existedUser.password, false);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<IUser | null> {
		return this.userModel.findByEmail(email);
	}
}
