import express from "express";
import {
  listPresentations,
  getPresentation,
  createPresentation,
  updatePresentation,
  patchPresentation,
  deletePresentation,
  bulkIntakePresentations,
  appendPresentationItem,
  deletePresentationItem,
} from "../../controller/presentation.js";

export const presentationRoute = express.Router();

presentationRoute.get('/', listPresentations);
presentationRoute.get('/:id', getPresentation);
presentationRoute.post('/', createPresentation);
presentationRoute.post('/bulk-intake', bulkIntakePresentations);
presentationRoute.put('/:id', updatePresentation);
presentationRoute.patch('/:id', patchPresentation);
presentationRoute.delete('/:id', deletePresentation);
presentationRoute.post('/:id/items', appendPresentationItem);
presentationRoute.delete('/:id/items/:itemId', deletePresentationItem);
