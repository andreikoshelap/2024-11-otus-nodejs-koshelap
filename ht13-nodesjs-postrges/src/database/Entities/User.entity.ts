import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() private _id: number | undefined;

  @Column({ length: 1024 }) private _name: string;

  @Column({ name: 'email', length: 1024 }) private _email: string;

  @Column({ name: 'password' }) private _password: string;

  @Column({ name: 'teacher' }) private _teacher: boolean;


    constructor(name: string, email: string, password: string, teacher: boolean) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._teacher = teacher;
    }


  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get teacher(): boolean {
    return this._teacher;
  }
}
