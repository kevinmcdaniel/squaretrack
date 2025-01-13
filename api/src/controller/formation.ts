import { Request, Response } from 'express';
import { emptyError, validationError } from '../common/errorHandler';
import { isNumeric } from '../common/utils';
import { listFormationService, listFormationsService } from '../service/formation';

const listFormation = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.formationId)) {
      throw new validationError(`Formation ID is an integer.  Invalid value:${req.params.formationId}.`);
    }
    const record = await listFormationService(parseInt(req.params.formationId,10));
    if (!record) {
      throw new emptyError(`Formation id:${req.params.formationId} not found!`);
    } else {
      res.json({
        message: 'Unique formation by id',
        data: record,
      });
    }
  } catch (error) {
    next(error);
  }
};

const listFormations = async (req: Request, res: Response, next: any) => {
  try {
    const records = await listFormationsService;
    if (records.length === 0) {
      throw new emptyError('No formations found!');
    }
    res.json({
      message: 'List of all formations',
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export { listFormation, listFormations };
