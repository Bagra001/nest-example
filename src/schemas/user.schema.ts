import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsDate, IsNotEmpty, IsString, IsStrongPassword, MinDate } from "class-validator";
import { Transform } from "class-transformer";

@Schema({ timestamps: true })
export class User {
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

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);