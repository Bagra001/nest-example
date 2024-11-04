import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinDate } from "class-validator";
import { Transform } from "class-transformer";
import { Prop } from "@nestjs/mongoose";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Prop()
  name: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Prop()
  password: string;

  @IsEmail()
  @Prop()
  email: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @Prop()
  birthday: string;
}
