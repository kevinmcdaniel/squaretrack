import express from "express";
import { callRoute } from "./calls/calls.js";
import { formationRoute } from "./calls/formations.js";
import { groupRoute } from "./people/groups.js";
import { sequenceRoute } from "./calls/sequences.js";
import { programRoute } from "./calls/programs.js";
import { teachOrderRoute } from "./calls/teach-orders.js";
import { callFormationRoute } from "./calls/call-formations.js";
import { callFamilyRoute } from "./calls/call-families.js";
import { moduleRoute } from "./calls/modules.js";

export const indexRoute = express.Router();

indexRoute.get('/', (_req, res) => {
  res.json({ message: 'Hello World 🌍🚀' });
});

indexRoute.use('/call', callRoute);
indexRoute.use('/formation', formationRoute);
indexRoute.use('/group', groupRoute);
indexRoute.use('/sequence', sequenceRoute);
indexRoute.use('/program', programRoute);
indexRoute.use('/teach-order', teachOrderRoute);
indexRoute.use('/call-formation', callFormationRoute);
indexRoute.use('/call-family', callFamilyRoute);
indexRoute.use('/module', moduleRoute);
