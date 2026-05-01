import express from 'express';
import { listPrograms, createProgram, listProgramCallFormations, createProgramCallFormation } from '../../controller/program.js';

export const programRoute = express.Router();

programRoute.get('/list', listPrograms);
programRoute.post('/', createProgram);
programRoute.get('/:programId/call-formations', listProgramCallFormations);
programRoute.post('/:programId/call-formation', createProgramCallFormation);
