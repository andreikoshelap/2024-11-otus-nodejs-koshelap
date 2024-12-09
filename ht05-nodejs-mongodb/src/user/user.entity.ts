import { hash } from 'bcryptjs';

export class User {
	private _password: string;
	private _teacher:boolean = false;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		_password: string,
		_teacher:boolean
	) {
		this._password = _password;
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string): Promise<void> {
		this._password = await hash(pass, 10);
	}
	get teacher(): boolean {
		return this._teacher;
	}


}
