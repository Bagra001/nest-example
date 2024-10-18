
import { Test, TestingModule } from '@nestjs/testing';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { UserDto } from './dtos/user.dto';

describe('AppService', () => {
  let appService: AppService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: AppRepository, useValue: { createUser: (userDto: UserDto) => Promise.resolve(userDto) } }
      ],
    }).compile();

    appService = testingModule.get<AppService>(AppService);
  });

  afterEach(async() => {
    await testingModule.close();
  })

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('createUser in UserService should be defined', async () => {
    expect(appService.createUser).toBeDefined();
    expect(appService.createUser).toBeInstanceOf(Function);
  });
});