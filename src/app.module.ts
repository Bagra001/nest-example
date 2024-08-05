import { Module } from '@nestjs/common';
import { ExampleLoggerFastRedactModule } from './example-logger-fast-redact/example.logger.fast-redact.module';

@Module({
  imports: [ExampleLoggerFastRedactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
