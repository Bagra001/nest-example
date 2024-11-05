import { Module } from '@nestjs/common';
import { ExampleTypeormModule } from './example-typeorm/example.typeorm.module';

@Module({
  imports: [ExampleTypeormModule],
})
export class AppModule {}
