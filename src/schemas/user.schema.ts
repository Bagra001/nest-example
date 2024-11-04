import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { IsDate, IsNotEmpty, IsString, IsStrongPassword, MinDate } from "class-validator";
import { Transform } from "class-transformer";

@Schema({ timestamps: true })
export class User {
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

  @IsString()
  @IsNotEmpty()
  @Prop()
  email: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @Prop()
  birthday: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);