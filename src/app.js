import express from 'express';
import cookieParser from 'cookie-parser';
import { mountApiDocs } from './docs/swagger.js';
import authRouter from './modules/auth/auth.router.js';
import parentRouter from './modules/parent/parent.router.js';
import paymentsRouter from './modules/payments/payments.router.js';
import schoolRouter from './modules/school/school.router.js';
import studentRouter from './modules/student/student.router.js';
import teacherRouter from './modules/teacher/teacher.router.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
mountApiDocs(app);


/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - System
 *     summary: Check API health
 *     description: Returns a basic health response to confirm the API is running.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
  });
});

app.use('/api/auth', authRouter);
app.use('/api/schools', schoolRouter);
app.use('/api/students', studentRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/parents', parentRouter);
app.use('/api/payments', paymentsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
