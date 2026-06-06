import { type Request, type Response, type NextFunction } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric, routeParam } from '../common/utils.js';
import {
  listFormationService,
  listFormationsService,
  searchFormationsService,
  listFormationsByCallService,
  listCallFormationsService,
  createFormationService,
  createCallFormationService,
} from '../service/formation/index.js';

export const listCallFormations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await listCallFormationsService();
    res.json({ data: records, message: 'List of all call formations' });
  } catch (error) {
    next(error);
  }
};

export const listFormation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formationId = routeParam(req.params.formationId);
    if (!isNumeric(formationId)) {
      throw new validationError(`Formation ID is an integer. Invalid value:${formationId}.`);
    }
    const record = await listFormationService(parseInt(formationId, 10));
    if (!record) throw new notFoundError(`Formation id:${formationId} not found!`);
    res.json({ message: 'Unique formation by id', data: record });
  } catch (error) {
    next(error);
  }
};

export const listFormations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, callId } = req.query as Record<string, string>;

    if (callId !== undefined) {
      if (!isNumeric(callId)) throw new validationError(`callId must be an integer. Invalid value:${callId}.`);
      const records = await listFormationsByCallService(parseInt(callId, 10));
      res.json({ message: 'Formations for call', data: records });
      return;
    }

    if (search !== undefined) {
      const records = await searchFormationsService(search);
      res.json({ message: 'Formation search results', data: records });
      return;
    }

    const records = await listFormationsService();
    res.json({ message: 'List of all formations', data: records });
  } catch (error) {
    next(error);
  }
};

export const createFormation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, clCode, sdCode } = req.body;
    if (!name) throw new validationError('name is required.');
    const record = await createFormationService({ name, description, clCode, sdCode });
    res.status(201).json({ message: 'Formation created', data: record });
  } catch (error) {
    next(error);
  }
};

export const createCallFormation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { callId, startId, endId, inFlowRotation, inFlowDirection, outFlowRotation, outFlowDirection } = req.body;
    if (!callId || !startId || !endId) throw new validationError('callId, startId, and endId are required.');
    const record = await createCallFormationService({
      callId, startId, endId, inFlowRotation, inFlowDirection, outFlowRotation, outFlowDirection,
    });
    res.status(201).json({ message: 'Call formation created', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Call formation (callId, startId) already exists.'));
    if (error?.code === 'P2003') return next(new conflictError('callId or startId/endId does not exist.'));
    next(error);
  }
};
