import { Injectable } from '@nestjs/common';

import { AppRepository } from './app.repository';
import { UserDto } from "./dtos/user.dto";
import { UserDocument } from "./schemas/user.schema";
import { Logger } from "@interhyp/nestjs-logging";

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  constructor(private readonly userRepository: AppRepository) {}

  async createUser(userDto: UserDto): Promise<UserDocument> {
    this.logger.info('Starting user creation process');
    return this.userRepository.createUser(userDto);
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    this.logger.info('Starting user deletion process');
    return this.userRepository.deleteUser(userId);
  }

  async updateUser(userId: string, userDto: Partial<UserDto>): Promise<UserDocument> {
    this.logger.info('Starting user update process');
    return this.userRepository.updateUser(userId, userDto);
  }

  async getUser(userId: string): Promise<UserDocument> {
    this.logger.info('Starting user fetching process');
    return this.userRepository.getUser(userId);
  }
}
