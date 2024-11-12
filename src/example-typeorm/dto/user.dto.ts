import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export class UserDto {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Exclude()
  password: string;

  @IsEmail()
  email: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  birthday?: Date;
}
