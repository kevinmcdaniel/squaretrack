import { type Request, type Response } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric } from '../common/utils.js';
import {
  createProgramService,
  updateProgramService,
  listProgramsService,
  listProgramCallFormationsService,
  createProgramCallFormationService,
} from '../service/program.js';

const VALID_DIFFICULTIES = ['easy', 'hard', 'challenging'];

export const listPrograms = async (req: Request, res: Response, next: any) => {
  try {
    const showInactive = req.query.showInactive === 'true';
    const records = await listProgramsService({ showInactive });
    const message = showInactive
      ? 'List of all programs (including inactive)'
      : 'List of all programs';
    res.json({ data: records, message });
  } catch (error) {
    next(error);
  }
};

export const createProgram = async (req: Request, res: Response, next: any) => {
  try {
    const { name, abbreviation, order, isActive } = req.body;
    if (!name || !abbreviation || order == null) {
      throw new validationError('name, abbreviation, and order are required.');
    }
    if (!Number.isFinite(Number(order))) {
      throw new validationError('order must be a number.');
    }
    if (isActive !== undefined && typeof isActive !== 'boolean') {
      throw new validationError('isActive must be a boolean.');
    }
    const record = await createProgramService({
      name,
      abbreviation,
      order: Number(order),
      ...(isActive !== undefined ? { isActive } : {}),
    });
    res.status(201).json({ message: 'Program created', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Program abbreviation already exists.'));
    next(error);
  }
};

export const updateProgram = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.programId)) {
      throw new validationError(`Program ID is an integer. Invalid value:${req.params.programId}.`);
    }
    const programId = parseInt(req.params.programId, 10);
    const { name, abbreviation, order, isActive } = req.body;

    if (
      name === undefined &&
      abbreviation === undefined &&
      order === undefined &&
      isActive === undefined
    ) {
      throw new validationError('At least one of name, abbreviation, order, or isActive is required.');
    }
    if (name !== undefined && !name) {
      throw new validationError('name cannot be empty.');
    }
    if (abbreviation !== undefined && !abbreviation) {
      throw new validationError('abbreviation cannot be empty.');
    }
    if (order !== undefined && !Number.isFinite(Number(order))) {
      throw new validationError('order must be a number.');
    }
    if (isActive !== undefined && typeof isActive !== 'boolean') {
      throw new validationError('isActive must be a boolean.');
    }

    const record = await updateProgramService(programId, {
      ...(name !== undefined ? { name } : {}),
      ...(abbreviation !== undefined ? { abbreviation } : {}),
      ...(order !== undefined ? { order: Number(order) } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
    });
    res.json({ message: 'Program updated', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Program abbreviation already exists.'));
    if (error?.code === 'P2025') return next(new notFoundError(`Program id:${req.params.programId} not found!`));
    next(error);
  }
};

export const listProgramCallFormations = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.programId)) {
      throw new validationError(`Program ID is an integer. Invalid value:${req.params.programId}.`);
    }
    const programId = parseInt(req.params.programId, 10);
    const records = await listProgramCallFormationsService(programId);
    res.json({
      data: records.map((r) => ({
        programId: r.programId,
        callId: r.callId,
        startId: r.startId,
        difficulty: r.difficulty,
        call: r.callFormation.call,
        startForm: r.callFormation.startForm,
      })),
      message: 'Program call formations',
    });
  } catch (error) {
    next(error);
  }
};

export const createProgramCallFormation = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.programId)) {
      throw new validationError(`Program ID is an integer. Invalid value:${req.params.programId}.`);
    }
    const programId = parseInt(req.params.programId, 10);
    const { callId, startId, difficulty } = req.body;

    if (!callId) throw new validationError('callId, startId, and difficulty are required.');
    if (!startId) throw new validationError('callId, startId, and difficulty are required.');
    if (!difficulty) throw new validationError('callId, startId, and difficulty are required.');
    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      throw new validationError(`difficulty must be easy, hard, or challenging.`);
    }

    const record = await createProgramCallFormationService({
      programId,
      callId: Number(callId),
      startId: Number(startId),
      difficulty,
    });
    res.status(201).json({ message: 'Program call formation added', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('This call formation is already in the program.'));
    if (error?.code === 'P2003') return next(new conflictError('callId/startId does not exist.'));
    if (error?.code === 'P2025') return next(new conflictError('callId/startId does not exist.'));
    next(error);
  }
};
