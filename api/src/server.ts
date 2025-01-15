// server.ts - applicaiton startup program
import express from 'express';
import { errorHandler } from './common/errorHandler';
import { indexRoute } from './route';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api',indexRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
