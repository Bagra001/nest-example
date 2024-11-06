import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ExcludeNullInterceptor } from './interceptors/exclude.password.interceptor';

@Controller('v1/users')
@UseInterceptors(ExcludeNullInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.userService.createUser(userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<UserDto> {
    return this.userService.deleteUser(userId);
  }

  @Put()
  async updateUser(@Body() userDto: Partial<UserDto>): Promise<UserDto> {
    return this.userService.updateUser(userDto);
  }
}
