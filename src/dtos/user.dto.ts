import { IsDate, IsNotEmpty, IsString, IsStrongPassword, MinDate } from "class-validator";
import { Transform } from "class-transformer";

export class UserDto {
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
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  birthday: string;
}
