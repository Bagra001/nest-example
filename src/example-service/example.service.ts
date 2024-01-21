import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';

@Injectable()
export class ExampleService {
  getResource(): string {
    return `You called GET resource`;
  }

  queryResource(queryValue: string): string {
    return `Your query-value is ${queryValue}`;
  }

  getResourceById(id: string): string {
    return `You called GET resource with ${id}`;
  }

  getResourceByName(params: any): string {
    return `You called GET resource with ${params.name}`;
  }

  throwException() {
    throw new HttpException('Example Controller Error', HttpStatus.BAD_REQUEST);
  }

  createResource(resource: ResourceDto): string {
    return `resource ${JSON.stringify(resource)} created`;
  }

  updateResource(id: string, updateResource: ResourceDto) {
    return `resource with id ${id} was updated with ${JSON.stringify(
      updateResource,
    )}`;
  }

  removeResource(id: string): string {
    return `This action removes a resource with id ${id}`;
  }
}
