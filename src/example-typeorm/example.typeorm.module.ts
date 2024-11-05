import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      dropSchema: true,
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UserEntity],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class ExampleTypeormModule {}
