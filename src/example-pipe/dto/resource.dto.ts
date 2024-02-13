import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ResourceDto {
  constructor(id: number, resourceName: string, resourceVersion: number) {
    this.id = id;
    this.name = resourceName;
    this.version = resourceVersion;
  }

  @IsPositive({ message: 'id should be positive' })
  @IsNumber()
  id: number = 0;
  @IsNotEmpty({ message: 'name should be not empty' })
  name: string;
  @IsPositive({ message: 'id should be positive' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'does not have more than 2 decimal places' },
  )
  version: number;
}
