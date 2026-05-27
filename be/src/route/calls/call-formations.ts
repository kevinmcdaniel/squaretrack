import express from "express";
import { authorizeUser } from "../../common/authorize.js";
import { listCallFormations, createCallFormation } from "../../controller/index.js";

export const callFormationRoute = express.Router();

callFormationRoute.get('/list', authorizeUser, listCallFormations);
callFormationRoute.post('/', authorizeUser, createCallFormation);
