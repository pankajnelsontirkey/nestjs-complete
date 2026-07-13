import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email) => {
        const filteredUsers = users.filter((user) => user.email === email);

        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999999),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of Auth Service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@mail.com', 'password');

    expect(user.password).not.toEqual('testpassword');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@mail.com', password: 'password' } as User,
      ]);

    await expect(service.signup('test@mail.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unregistered email', async () => {
    await expect(service.signin('test@mail.com', 'password')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if signin is attempted with incorrect password', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@mail.com', password: 'password' } as User,
      ]);

    await expect(service.signin('test@mail.com', 'abcde')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct email/password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     {
    //       id: 1,
    //       email: 'test@mail.com',
    //       password:
    //         '608f7f746619efcb.c88cf0ae5707501a73f728276905710b7bfd578b56ea6ff80d77ad9191104bf3',
    //     } as User,
    //   ]);

    await service.signup('test@mail.com', 'password');

    const user = await service.signin('test@mail.com', 'password');
    expect(user).toBeDefined();
  });
});
