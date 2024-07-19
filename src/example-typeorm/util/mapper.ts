import { ResourceEntity } from '../entity/resource.entity';
import { ResourceDto } from '../dto/resource.dto';

export const Mapper = {
  mapToDto({ id, name, email, version }: ResourceEntity): ResourceDto {
    return { id, resourceName: name, email, version };
  },
};
