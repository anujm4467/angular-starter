import { ErrorHandler, Injectable } from '@angular/core';

import { LoggerService } from '../logger';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(
    private loggerService: LoggerService
  ) {
    super();
  }

  handleError(error: Error) {
    super.handleError(error);

    this.loggerService.captureException(error, null);
  }
}
