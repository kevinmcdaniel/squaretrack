import { Request, Response } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric } from '../common/utils.js';
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
      if (!entry.callId) throw new validationError('call entries require callId and startId.');
      if (!entry.startId) throw new validationError('call entries require callId and startId.');
      const inProgram = await checkCallFormationInProgram(programId, entry.callId, entry.startId);
      if (!inProgram) {
        throw new conflictError(
          `call formation (callId ${entry.callId}, startId ${entry.startId}) is not valid for this program.`
        );
      }
    }
  }
}

export const listTeachOrders = async (req: Request, res: Response, next: any) => {
  try {
    const records = await listTeachOrdersService();
    res.json({ data: records.length ? records : null, message: 'List of all teach orders' });
  } catch (error) {
    next(error);
  }
};

export const getTeachOrder = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.id)) {
      throw new validationError(`Teach order ID is an integer. Invalid value:${req.params.id}.`);
    }
    const id = parseInt(req.params.id, 10);
    const record = await getTeachOrderService(id);
    res.json({ data: record ?? null, message: 'Teach order with entries' });
  } catch (error) {
    next(error);
  }
};

export const createTeachOrder = async (req: Request, res: Response, next: any) => {
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
    if (error?.code === 'P2002') return next(new conflictError('Duplicate sortOrder within this teach order.'));
    next(error);
  }
};

export const updateTeachOrder = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.id)) {
      throw new validationError(`Teach order ID is an integer. Invalid value:${req.params.id}.`);
    }
    const id = parseInt(req.params.id, 10);
    const { entries } = req.body;
    if (!entries) throw new validationError('entries are required.');

    const existing = await getTeachOrderService(id);
    if (!existing) throw new notFoundError(`Teach order id:${id} not found.`);

    await validateEntries(existing.programId, entries);

    const record = await updateTeachOrderService(id, entries);
    res.json({ message: 'Teach order updated', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Duplicate sortOrder within this teach order.'));
    next(error);
  }
};

export const parseTeachOrder = async (req: Request, res: Response, next: any) => {
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
