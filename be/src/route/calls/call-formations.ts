import express from "express";
import { listCallFormations, createCallFormation } from "../../controller/index.js";

export const callFormationRoute = express.Router();

callFormationRoute.get('/list', listCallFormations);
callFormationRoute.post('/', createCallFormation);
