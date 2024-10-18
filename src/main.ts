import { Apm } from '@interhyp/nestjs-apm';
import { Logger } from '@interhyp/nestjs-logging';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configuration } from './config/configuration';

async function bootstrap() {
  // Start apm before loading the nest js modules
  Apm.start();
  const logger = new Logger(configuration().service.logLevel);
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getOrThrow<number>('service.port')!);
}

void bootstrap();