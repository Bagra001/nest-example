import { ExampleService } from './example.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { HttpException } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';

describe('ExampleService', () => {
  let exampleService: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService],
    }).compile();

    exampleService = module.get<ExampleService>(ExampleService);
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
    expect(exampleService.getResourceById('123')).toBe(
      'You called GET resource with 123',
    );
  });

  it('call queryResource should success', () => {
    expect(exampleService.queryResource('123')).toBe('Your query-value is 123');
  });

  it('call throwError should success', () => {
    try {
      exampleService.throwException();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toBe(400);
      expect((error as HttpException).getResponse()).toBe(
        'Example Controller Error',
      );
    }
  });

  it('call createResource should success', () => {
    expect(
      exampleService.createResource(new ResourceDto(1, 'resourceName')),
    ).toBe('resource {"id":1,"name":"resourceName"} created');
  });

  it('call updateResource should success', () => {
    expect(
      exampleService.updateResource('20', new ResourceDto(1, 'resourceName')),
    ).toBe(
      'resource with id 20 was updated with {"id":1,"name":"resourceName"}',
    );
  });

  it('call remove should success', () => {
    expect(exampleService.removeResource('20')).toBe(
      'This action removes a resource with id 20',
    );
  });
});
