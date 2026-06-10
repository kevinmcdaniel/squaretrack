import { type Request, type Response, type NextFunction } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric, routeParam } from '../common/utils.js';
import {
  listPresentationsService,
  getPresentationService,
  createPresentationService,
  updatePresentationService,
  patchPresentationService,
  deletePresentationService,
  presentationExists,
  appendItemService,
  deleteItemService,
  type PresentationInput,
  type ItemInput,
  type PresentationListFilters,
} from '../service/presentation/index.js';

function presentationIdFromParams(req: Request): number {
  const idParam = routeParam(req.params.id);
  if (!isNumeric(idParam)) {
    throw new validationError(`Presentation ID is an integer. Invalid value:${idParam}.`);
  }
  return parseInt(idParam, 10);
}

function numericQuery(value: unknown): number | undefined {
  if (typeof value !== 'string' || !isNumeric(value)) return undefined;
  return parseInt(value, 10);
}

// Validate a single item's shape. Reference/stepOrder checks are the service's
// job (they need DB lookups); this only guards the discriminated-union shape.
function validateItemShape(item: any): ItemInput {
  if (item?.type !== 'module_ref' && item?.type !== 'text') {
    throw new validationError("each item type must be 'module_ref' or 'text'.");
  }
  if (item.type === 'text' && (item.text == null || item.text === '')) {
    throw new validationError('text items require text.');
  }
  if (item.steps != null && !Array.isArray(item.steps)) {
    throw new validationError('item steps must be an array.');
  }
  return item as ItemInput;
}

function validatePresentationBody(body: any): PresentationInput {
  if (!body?.name) throw new validationError('name is required.');
  const items = body.items ?? [];
  if (!Array.isArray(items)) throw new validationError('items must be an array.');
  items.forEach(validateItemShape);
  return {
    name: body.name,
    source: body.source ?? null,
    activator: body.activator ?? null,
    rating: body.rating ?? null,
    notes: body.notes ?? null,
    sourceText: body.sourceText ?? null,
    items,
  };
}

export const listPresentations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: PresentationListFilters = {
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      source: typeof req.query.source === 'string' ? req.query.source : undefined,
      activator: typeof req.query.activator === 'string' ? req.query.activator : undefined,
      moduleId: numericQuery(req.query.moduleId),
      safeAfterMax: numericQuery(req.query.safeAfterMax),
    };
    const records = await listPresentationsService(filters);
    res.json({ data: records, message: 'List of presentations' });
  } catch (error) {
    next(error);
  }
};

export const getPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = presentationIdFromParams(req);
    const record = await getPresentationService(id);
    if (!record) throw new notFoundError(`Presentation id:${id} not found!`);
    res.json({ data: record, message: 'Presentation by id' });
  } catch (error) {
    next(error);
  }
};

export const createPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validatePresentationBody(req.body);
    const { presentation, flowWarnings } = await createPresentationService(input);
    res.status(201).json({ message: 'Presentation created', data: presentation, flowWarnings });
  } catch (error: any) {
    if (error?.code === 'P2003') return next(new conflictError('A referenced module does not exist.'));
    next(error);
  }
};

export const updatePresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = presentationIdFromParams(req);
    const input = validatePresentationBody(req.body);
    if (!(await presentationExists(id))) throw new notFoundError(`Presentation id:${id} not found.`);
    const { presentation, flowWarnings } = await updatePresentationService(id, input);
    res.json({ message: 'Presentation updated', data: presentation, flowWarnings });
  } catch (error: any) {
    if (error?.code === 'P2003') return next(new conflictError('A referenced module does not exist.'));
    next(error);
  }
};

export const patchPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = presentationIdFromParams(req);
    if (!(await presentationExists(id))) throw new notFoundError(`Presentation id:${id} not found.`);
    const { name, source, activator, rating, notes } = req.body;
    const record = await patchPresentationService(id, { name, source, activator, rating, notes });
    res.json({ message: 'Presentation metadata updated', data: record });
  } catch (error) {
    next(error);
  }
};

export const deletePresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = presentationIdFromParams(req);
    if (!(await presentationExists(id))) throw new notFoundError(`Presentation id:${id} not found.`);
    await deletePresentationService(id);
    res.json({ message: 'Presentation deleted', data: { id } });
  } catch (error) {
    next(error);
  }
};

export const appendPresentationItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = presentationIdFromParams(req);
    if (!(await presentationExists(id))) throw new notFoundError(`Presentation id:${id} not found.`);
    const item = validateItemShape(req.body);
    const record = await appendItemService(id, item);
    res.status(201).json({ message: 'Presentation item appended', data: record });
  } catch (error: any) {
    if (error?.code === 'P2003') return next(new conflictError('A referenced module does not exist.'));
    next(error);
  }
};

export const deletePresentationItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = presentationIdFromParams(req);
    const itemParam = routeParam(req.params.itemId);
    if (!isNumeric(itemParam)) throw new validationError(`Item ID is an integer. Invalid value:${itemParam}.`);
    const itemId = parseInt(itemParam, 10);
    const removed = await deleteItemService(id, itemId);
    if (!removed) throw new notFoundError(`Item id:${itemId} not found on presentation id:${id}.`);
    res.json({ message: 'Presentation item deleted', data: { id: itemId } });
  } catch (error) {
    next(error);
  }
};
