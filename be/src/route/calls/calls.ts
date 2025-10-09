import express from "express";
import { listCall, listCalls } from "../../controller";
import { authorizeUser } from "../../common/authorize";

export const callRoute = express.Router();

callRoute.get(
  '/list',
  // featurecheck,
  authorizeUser,
  listCalls,
 );

callRoute.get(
  '/list/:callId',
  authorizeUser,
  listCall,
);
