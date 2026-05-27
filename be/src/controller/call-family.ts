import { Request, Response } from 'express';
import { validationError, notFoundError } from '../common/errorHandler.js';
import { isNumeric } from '../common/utils.js';
import { listCallFamiliesService, listCallFamilyService } from '../service/call-family.js';

export const listCallFamilies = async (_req: Request, res: Response, next: any) => {
  try {
    const records = await listCallFamiliesService();
    res.json({ data: records, message: 'List of all call families' });
  } catch (error) {
    next(error);
  }
};

export const listCallFamily = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.familyId)) {
      throw new validationError(`Family ID is an integer. Invalid value:${req.params.familyId}.`);
    }
    const record = await listCallFamilyService(parseInt(req.params.familyId, 10));
    if (!record) throw new notFoundError(`Call family id:${req.params.familyId} not found!`);
    res.json({ message: 'Unique call family by id', data: record });
  } catch (error) {
    next(error);
  }
};
