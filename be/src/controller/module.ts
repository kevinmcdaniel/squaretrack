import { type Request, type Response, type NextFunction } from 'express';
import { validationError, conflictError, notFoundError } from '../common/errorHandler.js';
import { isNumeric, routeParam } from '../common/utils.js';
import {
  listModulesService,
  getModuleService,
  moduleExists,
  createModuleService,
  updateModuleService,
  deleteModuleService,
  countModulePresentationRefs,
  listModulePresentationsService,
  type ModuleInput,
  type ModuleListFilters,
} from '../service/module/index.js';

function moduleIdFromParams(req: Request): number {
  const idParam = routeParam(req.params.id);
  if (!isNumeric(idParam)) {
    throw new validationError(`Module ID is an integer. Invalid value:${idParam}.`);
  }
  return parseInt(idParam, 10);
}

// A module body is well-formed when name/startFormId are present and every step
// carries callId + startId. Choreographic validity (chaining, endFormId) is the
// service's job — this only guards the shape.
function validateModuleBody(body: any): ModuleInput {
  if (!body?.name) throw new validationError('name is required.');
  if (body.startFormId == null) throw new validationError('startFormId is required.');
  const steps = body.steps ?? [];
  if (!Array.isArray(steps)) throw new validationError('steps must be an array.');
  for (const step of steps) {
    if (step.callId == null || step.startId == null) {
      throw new validationError('each step requires callId and startId.');
    }
  }
  return {
    name: body.name,
    startFormId: Number(body.startFormId),
    endFormId: body.endFormId != null ? Number(body.endFormId) : null,
    inFlowRotation: body.inFlowRotation ?? null,
    inFlowDirection: body.inFlowDirection ?? null,
    outFlowRotation: body.outFlowRotation ?? null,
    outFlowDirection: body.outFlowDirection ?? null,
    teachOrderId: body.teachOrderId != null ? Number(body.teachOrderId) : null,
    isVerified: body.isVerified,
    steps,
  };
}

function numericQuery(value: unknown): number | undefined {
  if (typeof value !== 'string' || !isNumeric(value)) return undefined;
  return parseInt(value, 10);
}

export const listModules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: ModuleListFilters = {
      startFormId: numericQuery(req.query.startFormId),
      teachOrderId: numericQuery(req.query.teachOrderId),
      safeAfterMax: numericQuery(req.query.safeAfterMax),
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      variantGroupId: typeof req.query.variantGroupId === 'string' ? req.query.variantGroupId : undefined,
    };
    const records = await listModulesService(filters);
    res.json({ data: records, message: 'List of choreo modules' });
  } catch (error) {
    next(error);
  }
};

export const getModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = moduleIdFromParams(req);
    const record = await getModuleService(id);
    if (!record) throw new notFoundError(`Module id:${id} not found!`);
    res.json({ data: record, message: 'Choreo module by id' });
  } catch (error) {
    next(error);
  }
};

export const createModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateModuleBody(req.body);
    const { module, chainBreaks, reusedExisting } = await createModuleService(input);
    if (reusedExisting) {
      // Exact step-row duplicate (#21): no new module created; the caller
      // should reference the existing one.
      res.json({ message: 'Identical choreo module already exists', data: module, chainBreaks, reusedExisting: true });
      return;
    }
    res.status(201).json({ message: 'Choreo module created', data: module, chainBreaks });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Duplicate step order within the module.'));
    if (error?.code === 'P2003') return next(new conflictError('startFormId, endFormId, teachOrderId, or a step call_formation does not exist.'));
    next(error);
  }
};

export const updateModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = moduleIdFromParams(req);
    const input = validateModuleBody(req.body);
    if (!(await moduleExists(id))) throw new notFoundError(`Module id:${id} not found.`);
    const { module, chainBreaks } = await updateModuleService(id, input);
    res.json({ message: 'Choreo module updated', data: module, chainBreaks });
  } catch (error: any) {
    if (error?.code === 'P2002') return next(new conflictError('Duplicate step order within the module.'));
    if (error?.code === 'P2003') return next(new conflictError('startFormId, endFormId, teachOrderId, or a step call_formation does not exist.'));
    next(error);
  }
};

export const deleteModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = moduleIdFromParams(req);
    if (!(await moduleExists(id))) throw new notFoundError(`Module id:${id} not found.`);
    const refs = await countModulePresentationRefs(id);
    if (refs > 0) {
      throw new conflictError(`Module id:${id} is referenced by ${refs} presentation item(s); delete those first.`);
    }
    await deleteModuleService(id);
    res.json({ message: 'Choreo module deleted', data: { id } });
  } catch (error) {
    next(error);
  }
};

export const listModulePresentations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = moduleIdFromParams(req);
    if (!(await moduleExists(id))) throw new notFoundError(`Module id:${id} not found.`);
    const records = await listModulePresentationsService(id);
    res.json({ data: records, message: 'Presentations that include this module' });
  } catch (error) {
    next(error);
  }
};
