
export class Course {
	private _name: string;
	private _teacher: string;

	constructor(_teacher: string, _name: string) {
		this._name = _name;
		this._teacher = _teacher;
	}

	get name(): string {
		return this._name;
	}

	get teacher(): string {
		return this._teacher;
	}
}
