import { type Request, type Response, type NextFunction } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric, routeParam } from '../common/utils.js';
import { listSequencesService, getSequenceService, createSequenceService } from '../service/sequence/index.js';
import { parseSequenceText } from '../service/parser.js';

export const listSequence = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seqParam = routeParam(req.params.seqId ?? req.params.sequenceId);
    if (!isNumeric(seqParam)) {
      throw new validationError(`Sequence ID is an integer. Invalid value:${seqParam}.`);
    }
    const id = parseInt(seqParam, 10);
    const record = await getSequenceService(id);
    if (!record) throw new notFoundError(`Sequence id:${id} not found!`);
    res.json({ message: 'Sequence by id', data: record });
  } catch (error) {
    next(error);
  }
};

export const listSequences = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await listSequencesService();
    res.json({ message: 'List of all sequences', data: records });
  } catch (error) {
    next(error);
  }
};

export const parseSequence = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    if (!text) throw new validationError('text is required.');
    const draft = await parseSequenceText(text);
    res.json({ message: 'Parsed draft', data: draft });
  } catch (error) {
    next(error);
  }
};

export const createSequence = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, startFormationId, activator, rating, notes, isVerified, sourceText, teachOrderId, steps } = req.body;
    if (!name) throw new validationError('name is required.');
    if (!startFormationId) throw new validationError('startFormationId is required.');
    const record = await createSequenceService({
      name, startFormationId, activator, rating, notes, isVerified, sourceText, teachOrderId,
      steps: steps ?? [],
    });
    res.status(201).json({ message: 'Sequence created', data: record });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Sequence name already exists.'));
    if (error?.code === 'P2003') return next(new conflictError('startFormationId does not exist.'));
    next(error);
  }
};
