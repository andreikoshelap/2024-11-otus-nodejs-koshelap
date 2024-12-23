import {IUser} from "./interface/user.entity.interface";
import {IUserModel} from "./interface/user.model.interface";
import {UserService} from "./user.service";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";

const usersModelMock: IUserModel = {
    deleteUser(id: string): void {
    },
    getAllUsers(): void {
    },
    updateUser(id: string,
               updateData: Partial<IUser>): void {
    },
    findByEmail: jest.fn(),
    createUser: jest.fn()
};
// const userServiceMock: UserService;
jest.mock('./user.service');
let userServiceMock = require('./user.service');

let createdUser: UserRegisterDto | null;
beforeAll(() => {

});

describe('User Service', () => {
    it('createUser', async () => {
        userServiceMock = jest.fn().mockImplementationOnce(
            (user: User): IUser => <IUser>({
                name: user.name,
                email: user.email,
                password: user.password,
                teacher: false,
            }),
        );
        createdUser =  await userServiceMock.createUser({
            email: 'a@a.ru',
            name: 'John',
            password: '1',
        });
        expect(createdUser?.id).toEqual(1);
        expect(createdUser?.password).not.toEqual('1');
    });

    it('validateUser - success', async () => {
        usersModelMock.findByEmail = jest.fn().mockReturnValueOnce(createdUser);
        const res = await userServiceMock.validateUser({
            email: 'a@a.ru',
            password: '1',
        });
        expect(res).toBeTruthy();
    });

    it('validateUser - wrong password', async () => {
        usersModelMock.findByEmail = jest.fn().mockReturnValueOnce(createdUser);
        const res = await userServiceMock.validateUser({
            email: 'a@a.ru',
            password: '2',
        });
        expect(res).toBeFalsy();
    });

    it('validateUser - wrong user', async () => {
        usersModelMock.findByEmail = jest.fn().mockReturnValueOnce(null);
        const res = await userServiceMock.validateUser({
            email: 'a2@a.ru',
            password: '2',
        });
        expect(res).toBeFalsy();
    });
});
