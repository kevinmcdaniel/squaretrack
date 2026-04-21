import express from "express";
import { listSequence, listSequences, parseSequence, createSequence } from "../../controller/index.js";

export const sequenceRoute = express.Router();

sequenceRoute.get('/list', listSequences);
sequenceRoute.get('/list/:sequenceId', listSequence);
sequenceRoute.get('/:seqId', listSequence);
sequenceRoute.post('/parse', parseSequence);
sequenceRoute.post('/', createSequence);
