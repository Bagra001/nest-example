import { ResourceDto } from './resource.dto';

export class NestedDto {
  constructor(resource: ResourceDto) {
    this.resource = resource;
  }

  resource: ResourceDto;
}
