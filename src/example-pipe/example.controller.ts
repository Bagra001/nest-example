import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  UsePipes,
} from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';

@Controller('resource')
export class ExampleController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getResource(): string {
    return `You called GET resource`;
  }

  @Get('/byQuery')
  queryResource(@Query('value') value: string): string {
    return `Your query-value is ${value}`;
  }

  @Get(':id')
  getResourceById(@Param('id') id: string): string {
    return `You called GET resource with ${id}`;
  }

  @Get(':name')
  getResourceByName(@Param() params: any): string {
    return `You called GET resource with ${params.name}`;
  }

  @UsePipes()
  @Get('/throw/error')
  throwError() {
    throw new HttpException('Example Controller Error', HttpStatus.BAD_REQUEST);
  }

  @Get('/redirect/to/resource')
  @Redirect('/resource', 301)
  redirectToGetResource() {}

  @Post() // add pipe to body
  createResource(@Body() resource: ResourceDto): string {
    return `resource ${JSON.stringify(resource)} created`;
  }

  @Put(':id')
  updateResource(@Param('id') id: string, @Body() updateResource: ResourceDto) {
    return `resource with id ${id} was updated with ${JSON.stringify(
      updateResource,
    )}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a resource with id ${id}`;
  }
}
