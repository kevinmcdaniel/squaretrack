import express from "express";
import { listFormation, listFormations, createFormation, createCallFormation } from "../../controller/index.js";

export const formationRoute = express.Router();

formationRoute.get('/list', listFormations);
formationRoute.get('/list/:formationId', listFormation);
formationRoute.get('/', listFormations);
formationRoute.post('/', createFormation);
formationRoute.post('/call-formation', createCallFormation);
