import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { ResourceDto } from './resource.dto';

describe('Validation of ResourceDto', () => {
  const validationPipe: ValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
  });
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: ResourceDto,
    data: '',
  };

  it('id is negative should fail', async () => {
    await validationPipe
      .transform(<ResourceDto>{ id: -1, name: 'someName' }, metadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual(['id should be positive']);
      });
  });

  it('id with 3 decimal place should fail', async () => {
    await validationPipe
      .transform(<ResourceDto>{ id: 1.999, name: 'someName' }, metadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'does not have more than 2 decimal places',
        ]);
      });
  });

  it('name undefined should fail', async () => {
    await validationPipe
      .transform(<ResourceDto>{ id: 99, name: undefined }, metadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual(['name should be not empty']);
      });
  });

  it('name null should fail', async () => {
    await validationPipe
      .transform(<ResourceDto>{ id: 99, name: null }, metadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual(['name should be not empty']);
      });
  });

  it('name empty should fail', async () => {
    await validationPipe
      .transform(<ResourceDto>{ id: 99, name: '' }, metadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual(['name should be not empty']);
      });
  });
});
