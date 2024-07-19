import { ExampleService } from './example.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ResourceDto } from './dto/resource.dto';
import { faker } from '@faker-js/faker';

describe('ExampleService', () => {
  let exampleService: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService],
    }).compile();

    exampleService = module.get<ExampleService>(ExampleService);

    faker.seed(123);
  });

  it('ExampleService is defined', () => {
    expect(exampleService).toBeDefined();
  });

  it('call getResource should success', () => {
    expect(exampleService.getResource()).toBe('You called GET resource');
  });

  it('call getResourceByName should success', () => {
    expect(exampleService.getResourceByName({ name: 'resourceName' })).toBe(
      'You called GET resource with resourceName',
    );
  });

  it('call getResourceById should success', () => {
    expect(exampleService.getResourceById(123)).toBe(
      'You called GET resource with 123',
    );
  });

  it('call createResource should success', () => {
    expect(
      exampleService.createResource(
        new ResourceDto(faker.commerce.productName(), faker.internet.email()),
      ),
    ).toBe('resource {"id":1,"name":"resourceName"} created');
  });

  it('call updateResource should success', () => {
    faker.seed(234);

    expect(
      exampleService.updateResource(
        123,
        new ResourceDto(faker.commerce.productName(), faker.internet.email()),
      ),
    ).toBe(
      'resource with id 20 was updated with {"id":1,"name":"resourceName"}',
    );
  });

  it('call remove should success', () => {
    expect(exampleService.removeResource(20)).toBe(
      'This action removes a resource with id 20',
    );
  });
});
