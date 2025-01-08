// import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { prisma } from './database';
import { indexRoute } from './route';

const app = express();

app.use(express.json());

app.use('/api',indexRoute);

app.use((err: any, req: Request, res: Response, next: any) => {
  if (res.headersSent) {
    return next(err);
  }
  // future - add passing of status for error message types...
  if (err.name === 'ValidationError') {
    res.status(406)
    res.json({
      message: `${err.name}: ${err.message}`,
      data: null,
    });
  }
  return next(err);
});

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
