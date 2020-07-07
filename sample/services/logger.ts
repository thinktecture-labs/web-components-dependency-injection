export abstract class Logger {
  abstract log(message: string);
}

export class ConsoleLog extends Logger {
  log(message: string) {
    console.log('(logger)', message);
  }
}

export class ConsoleWarn extends Logger {
  log(message: string) {
    console.warn('(child logger)', message);
  }
}
