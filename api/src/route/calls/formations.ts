import express from "express";
import { listFormation, listFormations } from "../../controller";

export const formationRoute = express.Router();

formationRoute.get(
  '/list',
  // featurecheck,
  // authorizeUser,
  listFormations,
 );

formationRoute.get(
  '/list/:formationId',
  listFormation,
);
