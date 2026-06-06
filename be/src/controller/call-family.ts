import { type Request, type Response } from 'express';
import { validationError, notFoundError } from '../common/errorHandler.js';
import { isNumeric, routeParam } from '../common/utils.js';
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
    const familyId = routeParam(req.params.familyId);
    if (!isNumeric(familyId)) {
      throw new validationError(`Family ID is an integer. Invalid value:${familyId}.`);
    }
    const record = await listCallFamilyService(parseInt(familyId, 10));
    if (!record) throw new notFoundError(`Call family id:${familyId} not found!`);
    res.json({ message: 'Unique call family by id', data: record });
  } catch (error) {
    next(error);
  }
};
