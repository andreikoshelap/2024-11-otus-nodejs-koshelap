import { User } from '../user/user.entity';

export class Course {
	private _name: string;
	private _teacher: User;

	constructor(_teacher: User, _name: string) {
		this._name = _name;
		this._teacher = _teacher;
	}

	get name(): string {
		return this._name;
	}

	get teacher(): User {
		return this._teacher;
	}
}
