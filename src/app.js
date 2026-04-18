import express from 'express';
import cookieParser from 'cookie-parser';
import schoolRouter from './modules/school/school.router.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'School management API is running',
  });
});

app.use('/api/v1/schools', schoolRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
