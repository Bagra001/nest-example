import { Module } from '@nestjs/common';
import { ExampleMongoModule } from './example-mongodb/exampleMongoModule';

@Module({
  imports: [ExampleMongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
