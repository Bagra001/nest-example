import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<UserDto> {
    this.logger.log('Starting user creation process');
    userDto.uuid = uuidv4();
    await this.userRepository.save(this.userRepository.create(userDto));
    return userDto;
  }

  async deleteUser(userId: string): Promise<UserDto> {
    this.logger.log('Starting user deletion process');
    const userToDelete = await this.userRepository.findOneBy({ uuid: userId });
    if (!userToDelete) {
      throw new NotFoundException(`User with uuid ${userId} not found`);
    }
    await this.userRepository.delete(userToDelete);
    return userToDelete as unknown as UserDto;
  }

  async updateUser(userDto: Partial<UserDto>): Promise<UserDto> {
    this.logger.log('Starting user update process');
    const userToUpdate = await this.userRepository.findOneBy({
      uuid: userDto.uuid,
    });
    if (!userToUpdate) {
      throw new NotFoundException(`User with uuid ${userDto.uuid} not found`);
    }
    await this.userRepository.update(userDto.uuid, userDto);
    return userToUpdate as unknown as UserDto;
  }

  async getUser(userId: string): Promise<UserDto> {
    this.logger.log('Starting user fetching process');
    return (await this.userRepository.findOneBy({
      uuid: userId,
    })) as unknown as UserDto;
  }
}
