export class Logger {
  public log(message: string): void {
    throw new Error('Not implemented.');
  }
}

export class ConsoleLog extends Logger {
  public log(message: string): void {
    console.log('(logger)', message);
  }
}

export class ConsoleWarn extends Logger {
  public log(message: string): void {
    console.warn('(child logger)', message);
  }
}
