import { Request, Response } from 'express';
import { emptyError, validationError } from '../common/errorHandler';
import { isNumeric } from '../common/utils';
import { listSequenceService, listSequencesService } from '../service/sequence';

const listSequence = async (req: Request, res: Response, next: any) => {
  try {
    if (!isNumeric(req.params.sequenceId)) {
      throw new validationError(`Sequence ID is an integer.  Invalid value:${req.params.sequenceId}.`);
    }
    const record = await listSequenceService(parseInt(req.params.sequenceId,10));
    if (!record) {
      throw new emptyError(`Sequence id:${req.params.sequenceId} not found!`);
    } else {
      res.json({
        message: 'Unique sequence by id',
        data: record,
      });
    }
  } catch (error) {
    next(error);
  }
};

const listSequences = async (req: Request, res: Response, next: any) => {
  try {
    const records = await listSequencesService;
    if (records.length === 0) {
      throw new emptyError('No sequences found!');
    }
    res.json({
      message: 'List of all sequences',
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export { listSequence, listSequences };
