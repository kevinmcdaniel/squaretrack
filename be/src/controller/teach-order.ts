import { type Request, type Response, type NextFunction } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric, routeParam } from '../common/utils.js';
import {
  listTeachOrdersService,
  getTeachOrderService,
  createTeachOrderService,
  updateTeachOrderService,
  checkCallFormationInProgram,
} from '../service/teach-order.js';
import { parseTeachOrderText } from '../service/teach-order-parser.js';

async function validateEntries(programId: number, entries: any[]) {
  for (const entry of entries) {
    if (entry.entryType === 'call') {
      if (!entry.callId) throw new validationError('call entries require callId.');
      if (!Array.isArray(entry.fasrs) || entry.fasrs.length === 0) {
        throw new validationError('call entries require at least one fasr.');
      }
      for (const fasr of entry.fasrs) {
        if (!fasr.callId || !fasr.startId) {
          throw new validationError('each fasr requires callId and startId.');
        }
        if (fasr.callId !== entry.callId) {
          throw new validationError(
            `fasr callId ${fasr.callId} does not match entry callId ${entry.callId}.`
          );
        }
        const inProgram = await checkCallFormationInProgram(programId, fasr.callId, fasr.startId);
        if (!inProgram) {
          throw new conflictError(
            `call formation (callId ${fasr.callId}, startId ${fasr.startId}) is not valid for this program.`
          );
        }
      }
    }
  }
}

export const listTeachOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await listTeachOrdersService();
    res.json({ data: records, message: 'List of all teach orders' });
  } catch (error) {
    next(error);
  }
};

export const getTeachOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idParam = routeParam(req.params.id);
    if (!isNumeric(idParam)) {
      throw new validationError(`Teach order ID is an integer. Invalid value:${idParam}.`);
    }
    const id = parseInt(idParam, 10);
    const record = await getTeachOrderService(id);
    if (!record) throw new notFoundError(`Teach order id:${id} not found!`);
    res.json({ data: record, message: 'Teach order with entries' });
  } catch (error) {
    next(error);
  }
};

export const createTeachOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, programId, entries } = req.body;
    if (!name) throw new validationError('name, programId, and entries are required.');
    if (!programId) throw new validationError('name, programId, and entries are required.');
    if (!entries) throw new validationError('name, programId, and entries are required.');

    await validateEntries(Number(programId), entries);

    const record = await createTeachOrderService({
      name,
      programId: Number(programId),
      entries,
    });
    res.status(201).json({ message: 'Teach order created', data: record });
  } catch (error: any) {
    if (error?.code === 'P2003') return next(new conflictError('programId does not exist.'));
    if (error?.code === 'P2002') return next(new conflictError('Duplicate entryOrder or displayOrder within this teach order.'));
    next(error);
  }
};

export const updateTeachOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idParam = routeParam(req.params.id);
    if (!isNumeric(idParam)) {
      throw new validationError(`Teach order ID is an integer. Invalid value:${idParam}.`);
    }
    const id = parseInt(idParam, 10);
    const { entries } = req.body;
    if (!entries) throw new validationError('entries are required.');

    const existing = await getTeachOrderService(id);
    if (!existing) throw new notFoundError(`Teach order id:${id} not found.`);

    await validateEntries(existing.programId, entries);

    const record = await updateTeachOrderService(id, entries);
    res.json({ message: 'Teach order updated', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Duplicate entryOrder or displayOrder within this teach order.'));
    next(error);
  }
};

export const parseTeachOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, programId } = req.body;
    if (!text) throw new validationError('text and programId are required.');
    if (!programId) throw new validationError('text and programId are required.');

    const parsed = await parseTeachOrderText(text, Number(programId));
    res.json({ data: parsed, message: 'Parsed teach order' });
  } catch (error) {
    next(error);
  }
};
