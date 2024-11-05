import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import type { MongooseModuleOptions } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.localhost.env'],
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        await ConfigModule.envVariablesLoaded;

        const envConfiguration = configuration();
        let mongooseModuleOptions: MongooseModuleOptions;

        mongooseModuleOptions = {
          uri: envConfiguration.database.url,
          dbName: envConfiguration.database.dbName,
        };

        return mongooseModuleOptions;
      },
      imports: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class ExampleMongoModule {}
