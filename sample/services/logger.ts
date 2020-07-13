export class Logger {
  log(message: string): void {
    throw new Error('Not implemented.');
  }
}

export class ConsoleLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }
}

export class AuthorizedConsoleLogger extends Logger {
  log(message: string): void {
    console.log('(!authorized)', message);
  }
}
