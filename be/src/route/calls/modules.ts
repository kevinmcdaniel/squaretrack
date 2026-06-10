import express from "express";
import {
  listModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  listModulePresentations,
} from "../../controller/module.js";

export const moduleRoute = express.Router();

moduleRoute.get('/', listModules);
moduleRoute.get('/:id/presentations', listModulePresentations);
moduleRoute.get('/:id', getModule);
moduleRoute.post('/', createModule);
moduleRoute.put('/:id', updateModule);
moduleRoute.delete('/:id', deleteModule);
