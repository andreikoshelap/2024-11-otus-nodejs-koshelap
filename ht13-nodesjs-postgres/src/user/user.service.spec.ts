import {IUser} from "./interface/user.entity.interface";
import {IUserService} from "./interface/users.service.interface";
import {IUserModel} from "./interface/user.model.interface";


const userServiceMock: IUserService = {
    createUser: jest.fn().mockResolvedValue({
        id: '1',
        email: 'a@a.ru',
        name: 'John',
        password: '1',
    }),
    validateUser: jest.fn().mockResolvedValue(true),
};

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

describe('User Service', () => {
    it('validateUser - success', async () => {
        const res = await userServiceMock.validateUser({
            email: 'a@a.ru',
            password: '1',
        });

        expect(res).toBe(true);
    });


    it('validateUser - wrong password', async () => {
        const createdUser = await userServiceMock.createUser({
            id: '1',
            email: 'a@a.ru',
            name: 'John',
            password: '2',
        });
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
