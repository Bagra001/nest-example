import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ExampleControllerModule } from '../src/example-controller/example.controller.module';
import { ResourceDto } from '../src/example-controller/dto/resource.dto';

describe('(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleControllerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get resource', () => {
    return request(app.getHttpServer()).get('/resource').expect(200);
  });

  it('get resource by query', () => {
    return request(app.getHttpServer())
      .get('/resource/byQuery?value=something')
      .expect(200);
  });

  it('get resource by id', () => {
    return request(app.getHttpServer()).get('/resource/123').expect(200);
  });

  it('get resource by name', () => {
    return request(app.getHttpServer())
      .get('/resource/resourceName')
      .expect(200);
  });

  it('get /redirect', () => {
    return request(app.getHttpServer())
      .get('/resource/redirect/to/resource')
      .expect(301);
  });

  it('should throw error', () => {
    return request(app.getHttpServer())
      .get('/resource/throw/error')
      .expect(400)
      .expect({ statusCode: 400, message: 'Example Controller Error' });
  });

  it('post resource', () => {
    return request(app.getHttpServer())
      .post('/resource')
      .send(new ResourceDto(123, 'resourceName'))
      .expect(201);
  });

  it('put resource', () => {
    return request(app.getHttpServer())
      .put('/resource/123')
      .send(new ResourceDto(123, 'resourceName'))
      .expect(200);
  });

  it('delete resource', () => {
    return request(app.getHttpServer()).delete('/resource/123').expect(200);
  });
});
