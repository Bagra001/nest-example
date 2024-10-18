import { Injectable } from '@nestjs/common';

import { AppRepository } from './app.repository';
import { UserDto } from "./dtos/user.dto";
import { UserDocument } from "./schemas/user.schema";

@Injectable()
export class AppService {
  constructor(private readonly userRepository: AppRepository) {}

  async createUser(userDto: UserDto): Promise<UserDocument> {
    return this.userRepository.createUser(userDto);
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    return this.userRepository.deleteUser(userId);
  }

  async updateUser(userId: string, userDto: Partial<UserDto>): Promise<UserDocument> {
    return this.userRepository.updateUser(userId, userDto);
  }

  async getUser(userId: string): Promise<UserDocument> {
    return this.userRepository.getUser(userId);
  }
}
