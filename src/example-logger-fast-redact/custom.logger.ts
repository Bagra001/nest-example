import { ConsoleLogger, LoggerService, LogLevel } from '@nestjs/common';
import * as FastRedact from 'fast-redact';

export class CustomLogger extends ConsoleLogger implements LoggerService {
  redactFields = FastRedact({
    paths: ['password', '*.password'],
    censor: '******',
  });

  private maskSensitiveData(data: any): any {
    if (typeof data === 'object') {
      return this.redactFields(data);
    } else if (typeof data === 'string') {
      return this.maskString(data);
    }
    return data;
  }

  private maskString(data: string): string {
    const passwordPattern = /\b(password|passwort)\s*[=:]\s*\S+/gi;
    return data.replace(passwordPattern, '$1 ******');
  }

  private logInternal(
    level: LogLevel,
    message: any,
    ...optionalParams: any[][]
  ) {
    message = this.maskSensitiveData(message);
    optionalParams.forEach((value, index) => {
      optionalParams[index] = this.maskSensitiveData(value);
    });
    switch (level) {
      case 'log':
        super.log(message, ...optionalParams);
        break;
      case 'debug':
        super.debug(message, ...optionalParams);
        break;
      case 'warn':
        super.warn(message, ...optionalParams);
        break;
      case 'error':
        super.error(message, ...optionalParams);
        break;
      case 'verbose':
        super.verbose(message, ...optionalParams);
        break;
      default:
        super.log(message, ...optionalParams);
    }
  }

  log(message: string, ...optionalParams: any[]): any {
    this.logInternal('log', message, ...(optionalParams as any[][]));
  }

  error(message: string, ...optionalParams: any[]): any {
    this.logInternal('error', message, ...(optionalParams as any[][]));
  }

  warn(message: string, ...optionalParams: any[]): any {
    this.logInternal('warn', message, ...(optionalParams as any[][]));
  }

  debug(message: string, ...optionalParams: any[]): any {
    this.logInternal('debug', message, ...(optionalParams as any[][]));
  }

  verbose(message: string, ...optionalParams: any[]): any {
    this.logInternal('verbose', message, ...(optionalParams as any[][]));
  }

  // only needed for apm logger
  fatal(message: string, ...optionalParams: any[]): any {
    this.logInternal('error', message, ...(optionalParams as any[][]));
  }

  // only needed for apm logger
  info(message: string, ...optionalParams: any[]): any {
    this.logInternal('log', message, ...(optionalParams as any[][]));
  }

  // only needed for apm logger
  trace(message: string, ...optionalParams: any[]): any {
    this.logInternal('verbose', message, ...(optionalParams as any[][]));
  }
}
