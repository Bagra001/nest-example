import { Global, Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { CustomLogger } from './custom.logger';

@Global()
@Module({
  controllers: [ExampleController],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class ExampleLoggerFastRedactModule {}
