import express from "express";
import { callRoute } from "./calls/calls.js";
import { formationRoute } from "./calls/formations.js";
import { groupRoute } from "./people/groups.js";
import { sequenceRoute } from "./calls/sequences.js";

export const indexRoute = express.Router();

indexRoute.get('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍🚀',
  });
});

import { createCallFormation } from "../controller/index.js";

indexRoute.use('/call', callRoute);
indexRoute.use('/formation', formationRoute);
indexRoute.use('/group', groupRoute);
indexRoute.use('/sequence', sequenceRoute);
indexRoute.post('/call-formation', createCallFormation);
