import { Request, Response } from 'express';
import { emptyError, validationError } from '../common/errorHandler';
import { isNumeric } from '../common/utils';
import { listCallService, listCallsService } from '../service/call/list';

const listCall = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.callId)) {
      throw new validationError(`Call ID is an integer.  Invalid value:${req.params.callId}.`);
    }
    const record = await listCallService(parseInt(req.params.callId,10));
    if (!record) {
      throw new emptyError(`Call id:${req.params.callId} not found!`);
    } else {
      res.json({
        message: 'Unique call by id',
        data: record,
      });
    }
  } catch (error) {
    next(error);
  }
};

const listCalls = async (req: Request, res: Response, next: any) => {
  try {
    const records = await listCallsService;
    if (records.length === 0) {
      throw new emptyError('No calls found!');
    }
    res.json({
      message: 'List of all calls',
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export { listCall, listCalls };
