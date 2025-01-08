// import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { prisma } from './database';
import { indexRoute } from './route';
import { errorHandler, validationErrorHandler } from './common/errors';

const app = express();

app.use(express.json());

app.use('/api',indexRoute);

app.use(validationErrorHandler);
app.use(errorHandler);

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
