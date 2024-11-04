import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { User, UserDocument } from "./schemas/user.schema";
import { UserDto } from "./dtos/user.dto";

@Injectable()
export class AppRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(user: UserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const createduser = await this.userModel.create(user);

    if(!createduser) {
      throw new BadRequestException('User could not be created');
    }

    return createduser;
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();

    if(!deletedUser){
      throw new NotFoundException('User not found')
    }

    return deletedUser;
  }

  async updateUser(userId: string, userDto: Partial<UserDto>): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: userDto },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async getUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();

    if(!user){
      throw new NotFoundException('User not found');
    }

    return user;
  }
}