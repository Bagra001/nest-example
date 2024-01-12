export class ResourceDto {
  constructor(id: number, resourceName: string) {
    this.id = id;
    this.name = resourceName;
  }

  id: number = 0;
  name: string;
}
