import express from 'express';
import cookieParser from 'cookie-parser';
import schoolRouter from './modules/school/school.router.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cookieParser());
app.use(express.json());



app.use('/api/schools', schoolRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
