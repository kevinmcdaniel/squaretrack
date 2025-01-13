import express from "express";

// temporary
import { prisma } from "../../database";

export const groupRoute = express.Router();


groupRoute.get('/list', async (req, res) => {
  const groups = await prisma.group.findMany();
  res.json({
    message: 'List of all groups',
    data: groups,
  });
});
