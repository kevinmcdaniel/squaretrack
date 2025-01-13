import express from "express";
import { callRoute } from "./calls/calls";
import { groupRoute } from "./people/groups";

export const indexRoute = express.Router();

indexRoute.get('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍🚀',
  });
});

indexRoute.use('/call',callRoute);
indexRoute.use('/group',groupRoute);
