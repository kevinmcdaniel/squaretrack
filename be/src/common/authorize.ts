import type { NextFunction, Response, Request } from 'express';
// import { prisma } from '../database';
import { authError } from './errorHandler.js';


export const authorizeApiKey = (apiValue: string) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      let { apiKey } = req.body;
      if (!apiKey) {
        apiKey = req.headers['x-api-key'];
      }
      if (!apiKey) {
        throw new authError('No API key provided');
      }
      // const key = await prisma.apiKey.findUnique({
      //   where: {
      //     key: apiKey,
      //     isActive: true,
      //   },
      //   select: {
      //     key: true,
      //     value: true,
      //   },
      // });
      const key = { key: 'hippoDanceParty', value: 'hippoSamba' };
      // compare the name of the key with apiValue
      if (!key) {
        throw new authError(`API Key not found.`);
      }
      if (key.value !== apiValue) {
        throw new authError(`Invalid API Key passed.`);
      }
      return next();
    } catch (error) {
      return (error);
    }
  };
}

export const authorizeUser = async (
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = 'passed';
    // let { apiKey } = req.body;
    // if (!apiKey) {
    //   apiKey = req.headers['x-api-key'];
    // }
    // if (!apiKey) {
    //   throw new authError('No API key provided');
    // }
    // const key = await prisma.apiKey.findUnique({
    //   where: {
    //     key: apiKey,
    //     isActive: true,
    //   },
    //   select: {
    //     key: true,
    //     value: true,
    //   },
    // });
    if (!token) {
      throw new authError(`token not available`);
    } else if (token !== 'passed') {
      throw new authError(`Invalid token access.`);
    }
    next ();
  } catch (error) {
    next (error);
  }
};

