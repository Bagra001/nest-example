import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AppRepository } from './app.repository';
import { UserDto } from "./dtos/user.dto";
import { UserDatabase } from "./types/test/UserDatabase";

describe('UserRepository', () => {
  let testingModule: TestingModule;
  let appRepository: AppRepository;
  const databaseInitialState = {
    users: []
  }
  let database: UserDatabase = Object.assign({}, databaseInitialState);

  const userModel = {
    new: jest.fn(),
    constructor: jest.fn(),
    find: jest.fn(),
    create: (userDto: UserDto) => {
      Promise.resolve(database.users.push(userDto))
      return userDto;
    },
    exec: jest.fn(),
  }

  const userModelProvider = {
    provide: getModelToken('User'),
    useValue: userModel,
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        userModelProvider,
        { provide: AppRepository, useValue: { createUser: (user: UserDto) => userModel.create(user) } }
      ],
    }).compile();

    appRepository = testingModule.get<AppRepository>(AppRepository);
  });

  afterEach(async() => {
    await testingModule.close();
    database = databaseInitialState
  })

  it('should be defined and have methods', () => {
    expect(appRepository).toBeDefined();
  });

  it('userRepository.createUser should be defined', () => {
    expect(appRepository.createUser).toBeDefined();
    expect(appRepository.createUser).toBeInstanceOf(Function);
  });

  it('userRepository.createUser should create user and return it back', async () => {
    const userDto = { name: "Nest Example", password: "Interhyp1!", email: "nest@example.com" } as UserDto;
    const createdUser = await appRepository.createUser(userDto);
    expect(createdUser).toBe(userDto);
  });
});