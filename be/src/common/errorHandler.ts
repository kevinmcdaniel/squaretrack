import { Request, Response } from 'express';

export class authError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Authrorization Error";
  }
}

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
  } else if (err.name === 'Authorization Error') {
    res.status(401).json({
      data: null,
      message: `${err.name}: ${err.message}`,
      status: 401,
    });
  } else if (err.name === 'Empty result') {
    res.status(200).json({
      data: null,
      message: `${err.name}: ${err.message}`,
      stutus: 200,
    });
  } else if (err.name === 'Validation Error') {
    res.status(406).json({
      data: {},
      message: `${err.name}: ${err.message}`,
      status: 406,
    });
  } else {
    console.error('default error handler:', err);
    res.status(500).json({
      data: {},
      message: `default error handler: ${err}`,
      status: 500,
    });
  }
};
