import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';
import { NestedDto } from './dto/nested.dto';

@Controller('resource')
export class ExampleController {
  private readonly logger = new Logger(ExampleController.name);
  @Get()
  queryResource(@Query('password') password: string): string {
    this.logger.log(`This is a password: ${password}`);
    return `Your query-value is ${password}`;
  }

  @Get(':password')
  getResourceById(@Param('password') password: string): string {
    this.logger.log(`This is a passwort: ${password}`);
    return `You called GET resource with ${password}`;
  }

  @Post()
  createResource(@Body() resource: ResourceDto): string {
    this.logger.log(resource);
    this.logger.log('This is a nested resource: ', resource);
    return `resource ${JSON.stringify(resource)} created`;
  }

  @Post('/nested')
  createNestedResource(@Body() nestedDto: NestedDto): string {
    this.logger.log(`This is a nested resource: ${JSON.stringify(nestedDto)}`);
    return `resource ${JSON.stringify(nestedDto)} created`;
  }
}
