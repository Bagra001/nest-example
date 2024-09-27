import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './example-logger-fast-redact/custom.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new CustomLogger());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
