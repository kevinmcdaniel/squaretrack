import express from "express";
import { callRoute } from "./calls/calls";
import { formationRoute } from "./calls/formations";
import { groupRoute } from "./people/groups";
import { sequenceRoute } from "./calls/sequences";

export const indexRoute = express.Router();

indexRoute.get('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍🚀',
  });
});

indexRoute.use('/call',callRoute);
indexRoute.use('/formation',formationRoute);
indexRoute.use('/group',groupRoute);
indexRoute.use('/sequence',sequenceRoute);
