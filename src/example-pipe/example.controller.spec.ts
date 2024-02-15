import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { HttpException } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('call getResource should success', () => {
    expect(controller.getResource()).toBe('You called GET resource');
  });

  it('call getResourceByName should success', () => {
    expect(controller.getResourceByName({ name: 'resourceName' })).toBe(
      'You called GET resource with resourceName',
    );
  });

  it('call getResourceById should success', () => {
    expect(controller.getResourceById('123')).toBe(
      'You called GET resource with 123',
    );
  });

  it('call queryResource should success', () => {
    expect(controller.queryResource('123')).toBe('Your query-value is 123');
  });

  it('call throwError should success', () => {
    try {
      controller.throwError();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toBe(400);
      expect((error as HttpException).getResponse()).toEqual({
        error: 'Bad Request',
        message: 'Example Controller Error',
        statusCode: 400,
      });
    }
  });

  it('call createResource should success', () => {
    expect(
      controller.createResource(
        new ResourceDto(1, 'resourceName', 2.0),
      ),
    ).toBe('resource {"id":1,"name":"resourceName","version":2} created');
  });

  it('call updateResource should success', () => {
    expect(
      controller.updateResource(
        '20',
        new ResourceDto(1, 'resourceName', 2.0),
      ),
    ).toBe(
      'resource with id 20 was updated with {"id":1,"name":"resourceName","version":2}',
    );
  });

  it('call remove should success', () => {
    expect(controller.remove('20')).toBe(
      'This action removes a resource with id 20',
    );
  });
});
