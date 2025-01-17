import { Request, Response } from 'express';

export class emptyError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Empty result";
  }
}

export class validationError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Validation Error";
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  if (res.headersSent) {
    next(err);
  } else if (err.name === 'Empty result') {
    res.status(200).json({
      message: `${err.name}: ${err.message}`,
      data: null,
    });
  } else if (err.name === 'Validation Error') {
    res.status(406).json({
      message: `${err.name}: ${err.message}`,
      data: null,
    });
  } else {
    res.status(500).json({
      message: `default error handler: ${err}`,
      data: null,
    });
  }
};
