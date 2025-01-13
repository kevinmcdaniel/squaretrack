// sequence routes
import express from "express";
import { listSequence, listSequences } from "../../controller";

export const sequenceRoute = express.Router();

sequenceRoute.get(
  '/list',
  // featurecheck,
  // authorizeUser,
  listSequences,
 );

sequenceRoute.get(
  '/list/:sequenceId',
  listSequence,
);
