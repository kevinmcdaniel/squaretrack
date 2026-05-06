import express from 'express';
import { listPrograms, createProgram, updateProgram, listProgramCallFormations, createProgramCallFormation } from '../../controller/program.js';

export const programRoute = express.Router();

programRoute.get('/list', listPrograms);
programRoute.post('/', createProgram);
programRoute.patch('/:programId', updateProgram);
programRoute.get('/:programId/call-formations', listProgramCallFormations);
programRoute.post('/:programId/call-formation', createProgramCallFormation);
