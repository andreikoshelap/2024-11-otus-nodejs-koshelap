export class UserLoginDto {
	email: string;
	password: string;

	constructor(email: string, password: string, name: string) {
		this.email = email;
		this.password = password;
	  }
}
