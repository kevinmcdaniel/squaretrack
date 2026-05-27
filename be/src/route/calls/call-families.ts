import express from "express";
import { authorizeUser } from "../../common/authorize.js";
import { listCallFamilies, listCallFamily } from "../../controller/index.js";

export const callFamilyRoute = express.Router();

callFamilyRoute.get('/list', authorizeUser, listCallFamilies);
callFamilyRoute.get('/list/:familyId', authorizeUser, listCallFamily);
