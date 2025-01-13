// group table routing
import express from "express";
import { listGroup, listGroups } from "../../controller";


export const groupRoute = express.Router();

groupRoute.get(
  '/list',
  // featurecheck,
  // authorizeUser,
  listGroups,
 );

groupRoute.get(
  '/list/:groupId',
  listGroup,
);
