export abstract class Logger {
  abstract log(message: string);
}

export class ConsoleLog extends Logger {
  log(message: string) {
    console.log(message);
  }
}

export class ConsoleLog2 extends Logger {
  log(message: string) {
    console.log('child logger', message);
  }
}
