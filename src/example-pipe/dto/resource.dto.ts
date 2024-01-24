import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ResourceDto {
  constructor(id: number, resourceName: string) {
    this.id = id;
    this.name = resourceName;
  }

  @IsPositive({ message: 'id should be positive' })
  @IsNumber({ maxDecimalPlaces: 2 })
  id: number = 0;
  @IsNotEmpty({ message: 'name should be not empty' })
  name: string;
}
