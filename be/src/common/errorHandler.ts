import { Request, Response } from 'express';

export class authError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Authrorization Error";
  }
}

export class validationError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Validation Error";
  }
}

export class conflictError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Conflict Error";
  }
}

export class notFoundError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "Not Found";
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  if (res.headersSent) {
    next(err);
  } else if (err.name === 'Authorization Error' || err.name === 'Authrorization Error') {
    res.status(401).json({ data: null, message: `${err.name}: ${err.message}`, status: 401 });
  } else if (err.name === 'Validation Error') {
    res.status(406).json({ data: {}, message: `${err.name}: ${err.message}`, status: 406 });
  } else if (err.name === 'Conflict Error') {
    res.status(409).json({ data: {}, message: `${err.name}: ${err.message}`, status: 409 });
  } else if (err.name === 'Not Found') {
    res.status(404).json({ data: null, message: `${err.name}: ${err.message}`, status: 404 });
  } else {
    console.error('default error handler:', err);
    res.status(500).json({ data: {}, message: `default error handler: ${err}`, status: 500 });
  }
};
