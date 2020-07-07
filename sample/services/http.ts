export abstract class HttpLogger {
  abstract log(message: string);
}

export class HttpConsoleLog extends HttpLogger {
  log(message: string) {
    console.log('(http)', message);
  }
}
