import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';
import { ExampleService } from './example.service';
import { DeleteResult } from 'typeorm';

@Controller('resource')
export class ExampleController {
  private exampleService: ExampleService;

  constructor(exampleService: ExampleService) {
    this.exampleService = exampleService;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getResource(): Promise<ResourceDto[]> {
    return this.exampleService.getResource();
  }

  @Get(':id')
  getResourceById(@Param('id') id: number): Promise<ResourceDto> {
    return this.exampleService.getResourceById(id);
  }

  @Get(':name')
  getResourceByName(@Param('name') name: string): Promise<ResourceDto> {
    return this.exampleService.getResourceByName(name);
  }

  @Post()
  createResource(@Body() resource: ResourceDto): Promise<ResourceDto> {
    return this.exampleService.createResource(resource);
  }

  @Put(':id')
  updateResource(
    @Param('id') id: number,
    @Body() updateResource: ResourceDto,
  ): Promise<ResourceDto> {
    return this.exampleService.updateResource(id, updateResource);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.exampleService.removeResource(id);
  }
}
