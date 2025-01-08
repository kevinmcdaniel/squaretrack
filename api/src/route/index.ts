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


// app.post('/users', async (req, res) => {
//   const { name, email } = req.body;
//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//     },
//   });
//   res.json({
//     message: 'User created successfully',
//     data: user,
//   });
// });
