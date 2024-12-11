import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;
	@IsString({ message: 'Choose password' })
	password: string;
	@IsString({ message: 'Choose name' })
	name: string;


	constructor(email: string, password: string, name: string) {
		this.email = email;
		this.password = password;
		this.name = name;
	}
}
