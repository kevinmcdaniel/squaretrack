// group table controller
import { type Request, type Response, type NextFunction } from 'express';
import { notFoundError } from '../common/errorHandler.js';
import { routeParam } from '../common/utils.js';
import { listGroupService, listGroupsService } from '../service/group.js';

const listGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = routeParam(req.params.groupId);
    const record = await listGroupService(groupId);
    if (!record) {
      throw new notFoundError(`Group id:${groupId} not found!`);
    }
    res.json({
      message: 'Unique group by id',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

const listGroups = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await listGroupsService();
    res.json({
      message: 'List of groups',
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export { listGroup, listGroups };
