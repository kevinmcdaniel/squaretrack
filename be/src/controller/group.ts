// group table controller
import { Request, Response } from 'express';
import { emptyError } from '../common/errorHandler';
import { listGroupService, listGroupsService } from '../service/group';

const listGroup = async (req: Request, res: Response, next: any) => {
  try {
    const record = await listGroupService(req.params.groupId);
    if (!record) {
      throw new emptyError(`Group id:${req.params.groupId} not found!`);
    } else {
      res.json({
        message: 'Unique group by id',
        data: record,
      });
    }
  } catch (error) {
    next(error);
  }
};

const listGroups = async (req: Request, res: Response, next: any) => {
  try {
    const records = await listGroupsService();
    if (records.length === 0) {
      throw new emptyError('No groups found!');
    }
    res.json({
      message: 'List of groups',
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export { listGroup, listGroups };
