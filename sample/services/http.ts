export class HttpLogger {
  public log(message: string): void {
    throw new Error('Not implmeneted.');
  }
}

export class HttpConsoleLog extends HttpLogger {
  public log(message: string): void {
    console.log('(http)', message);
  }
}
