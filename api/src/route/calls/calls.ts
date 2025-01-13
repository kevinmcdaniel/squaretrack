import express from "express";
import { listCall, listCalls } from "../../controller";

export const callRoute = express.Router();

callRoute.get(
  '/list',
  // featurecheck,
  // authorizeUser,
  listCalls,
 );

callRoute.get(
  '/list/:callId',
  listCall,
);
