import { Injectable, NotFoundException } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceEntity } from './entity/resource.entity';
import { Repository, DeleteResult } from 'typeorm';
import { Mapper } from './util/mapper';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}

  async getResource(): Promise<ResourceDto[]> {
    const resources = await this.resourceRepository.find();
    return [...resources.map((resource) => Mapper.mapToDto(resource))];
  }

  async getResourceById(id: number): Promise<ResourceDto> {
    const resource = await this.resourceRepository.findOneBy({ id });
    if (!resource) {
      throw new NotFoundException(`Not found any resource with id: ${id}`);
    }
    return Mapper.mapToDto(resource);
  }

  async getResourceByName(name: string): Promise<ResourceDto> {
    const resource = await this.resourceRepository.findOneBy({ name });
    if (!resource) {
      throw new NotFoundException(`Not found any resource with name: ${name}`);
    }
    return Mapper.mapToDto(resource);
  }

  async createResource(resource: ResourceDto): Promise<ResourceDto> {
    const createdResource = this.resourceRepository.create(resource);
    return Mapper.mapToDto(await this.resourceRepository.save(createdResource));
  }

  async updateResource(
    id: number,
    updateResource: ResourceDto,
  ): Promise<ResourceDto> {
    const resource = await this.resourceRepository.findOneBy({ id });
    this.resourceRepository.merge(resource, updateResource);
    return Mapper.mapToDto(await this.resourceRepository.save(resource));
  }

  removeResource(id: number): Promise<DeleteResult> {
    return this.resourceRepository.delete({ id });
  }
}
