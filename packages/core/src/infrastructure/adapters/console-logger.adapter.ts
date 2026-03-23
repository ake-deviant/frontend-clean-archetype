import { ILogger } from '../../application/ports/logger.port';

export class ConsoleLogger implements ILogger {
  log(message: string, ...args: unknown[]): void {
    console.log(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }
}
