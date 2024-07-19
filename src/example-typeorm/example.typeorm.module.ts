import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true, dropSchema: true }),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleTypeormModule {}
