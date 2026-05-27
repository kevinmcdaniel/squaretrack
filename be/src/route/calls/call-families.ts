import express from "express";
import { listCallFamilies, listCallFamily } from "../../controller/index.js";

export const callFamilyRoute = express.Router();

callFamilyRoute.get('/list', listCallFamilies);
callFamilyRoute.get('/list/:familyId', listCallFamily);
