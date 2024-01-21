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
  Query,
  Redirect,
} from '@nestjs/common';
import { ResourceDto } from '../example-controller/dto/resource.dto';
import { ExampleService } from './example.service';

@Controller('resource')
export class ExampleController {
  private exampleService: ExampleService;

  constructor(exampleService: ExampleService) {
    this.exampleService = exampleService;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getResource(): string {
    return this.exampleService.getResource();
  }

  @Get('/byQuery')
  queryResource(@Query('value') value: string): string {
    return this.exampleService.queryResource(value);
  }

  @Get(':id')
  getResourceById(@Param('id') id: string): string {
    return this.exampleService.getResourceById(id);
  }

  @Get(':name')
  getResourceByName(@Param() params: any): string {
    return this.exampleService.getResourceByName(params);
  }

  @Get('/throw/error')
  throwError() {
    this.exampleService.throwException();
  }

  @Get('/redirect/to/resource')
  @Redirect('/resource', 301)
  redirectToGetResource() {}

  @Post()
  createResource(@Body() resource: ResourceDto): string {
    return this.exampleService.createResource(resource);
  }

  @Put(':id')
  updateResource(@Param('id') id: string, @Body() updateResource: ResourceDto) {
    return this.exampleService.updateResource(id, updateResource);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exampleService.removeResource(id);
  }
}
