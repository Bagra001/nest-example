import { Injectable, NotFoundException } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUser(userId: string): Promise<UserDto | never> {
    return {
      ...(await this.userRepository
        .findOneByOrFail({
          uuid: userId,
        })
        .catch(() => {
          throw new NotFoundException(`User with uuid ${userId} not found`);
        })),
    };
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    userDto.uuid = uuidv4();
    await this.userRepository.save(this.userRepository.create(userDto));
    return userDto;
  }

  async deleteUser(userId: string): Promise<UserDto> {
    const userToDelete = await this.getUser(userId);
    await this.userRepository.delete({
      uuid: userId,
    });
    return userToDelete;
  }

  async updateUser(userDto: UserDto): Promise<UserDto> {
    await this.getUser(userDto.uuid);
    await this.userRepository.update({ uuid: userDto.uuid }, userDto);
    return userDto;
  }
}
