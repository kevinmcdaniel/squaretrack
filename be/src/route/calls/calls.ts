import express from "express";
import { listCall, listCalls, createCall, createCallSynonym } from "../../controller/index.js";
import { authorizeUser } from "../../common/authorize.js";

export const callRoute = express.Router();

callRoute.get('/list', authorizeUser, listCalls);
callRoute.get('/list/:callId', authorizeUser, listCall);
callRoute.post('/', authorizeUser, createCall);
callRoute.post('/:callId/synonym', authorizeUser, createCallSynonym);
