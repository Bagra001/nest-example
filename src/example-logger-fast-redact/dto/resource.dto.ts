export class ResourceDto {
  constructor(id: number, resourceName: string, password: string) {
    this.id = id;
    this.name = resourceName;
    this.password = password;
  }

  id: number = 0;
  name: string;
  password: string;
}
