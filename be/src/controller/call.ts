import { Request, Response } from 'express';
import { emptyError, validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric } from '../common/utils.js';
import { listCallService, listCallsService } from '../service/call/list.js';
import { createCallService, createCallSynonymService } from '../service/call/create.js';

export const listCall = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.callId)) {
      throw new validationError(`Call ID is an integer. Invalid value:${req.params.callId}.`);
    }
    const record = await listCallService(parseInt(req.params.callId, 10));
    if (!record) {
      throw new emptyError(`Call id:${req.params.callId} not found!`);
    }
    res.json({ message: 'Unique call by id', data: record });
  } catch (error) {
    next(error);
  }
};

export const listCalls = async (req: Request, res: Response, next: any) => {
  try {
    const records = await listCallsService();
    if (records.length === 0) throw new emptyError('No calls found!');
    res.json({ data: records, message: 'List of all calls', status: 200 });
  } catch (error) {
    next(error);
  }
};

export const createCall = async (req: Request, res: Response, next: any) => {
  try {
    const { name, tamSeq, sdSeq, preferredDisplay, familyId } = req.body;
    if (!name) throw new validationError('name is required.');
    const record = await createCallService({ name, tamSeq, sdSeq, preferredDisplay, familyId });
    res.status(201).json({ message: 'Call created', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Call name already exists.'));
    if (error?.code === 'P2003') return next(new conflictError('familyId does not exist.'));
    next(error);
  }
};

export const createCallSynonym = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.callId)) {
      throw new validationError(`Call ID is an integer. Invalid value:${req.params.callId}.`);
    }
    const callId = parseInt(req.params.callId, 10);
    const { alias } = req.body;
    if (!alias) throw new validationError('alias is required.');

    const call = await listCallService(callId);
    if (!call) throw new notFoundError(`Call id:${callId} not found!`);

    const record = await createCallSynonymService(callId, alias);
    res.status(201).json({ message: 'Synonym added', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Alias already exists.'));
    next(error);
  }
};
