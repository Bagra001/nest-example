export class ResourceDto {
  id?: number;
  resourceName: string;
  email: string;
  version: number = 1;

  constructor(resourceName: string, email: string) {
    this.resourceName = resourceName;
    this.email = email;
  }
}
