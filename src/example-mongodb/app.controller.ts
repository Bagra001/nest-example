import { Body, Controller, Post, Delete, Patch, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { UserDto } from './dtos/user.dto';
import { UserDocument } from "./schemas/user.schema";

@Controller('v1/users')
export class AppController {
  constructor(private readonly userService: AppService) {}

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDocument> {
    return this.userService.createUser(userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<UserDocument> {
    return this.userService.deleteUser(userId);
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() userDto: Partial<UserDto>): Promise<UserDocument> {
    return this.userService.updateUser(userId, userDto);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<UserDocument> {
    return this.userService.getUser(userId);
  }
}