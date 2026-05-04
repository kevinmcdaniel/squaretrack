// group table controller
import { Request, Response } from 'express';
import { notFoundError } from '../common/errorHandler.js';
import { listGroupService, listGroupsService } from '../service/group.js';

const listGroup = async (req: Request, res: Response, next: any) => {
  try {
    const record = await listGroupService(req.params.groupId);
    if (!record) {
      throw new notFoundError(`Group id:${req.params.groupId} not found!`);
    }
    res.json({
      message: 'Unique group by id',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

const listGroups = async (req: Request, res: Response, next: any) => {
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
