import { Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(500);
  res.json({
    message: `default error handler: ${err}`,
    data: null,
  });
};

export const validationErrorHandler = (err: any, req: Request, res: Response, next: any) => {
  if (res.headersSent) {
    next(err);
  }
  // future - add passing of status for error message types...
  if (err.name === 'Validation Error') {
    res.status(406);
    res.json({
      message: `${err.name}: ${err.message}`,
      data: null,
    });
  } else {
    next(err);
  }
};
