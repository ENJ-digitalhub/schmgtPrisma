import { Router } from 'express';
import {
  createStudentController,
  listStudentsController,
} from './student.controller.js';
import { authMiddleware, permit } from '../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Student
 *     description: Student management endpoints
 */

/**
 * @openapi
 * /api/students:
 *   get:
 *     tags:
 *       - Student
 *     summary: List students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentListResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     tags:
 *       - Student
 *     summary: Create a student scaffold record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentRequest'
 *     responses:
 *       201:
 *         description: Student scaffold created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/',
  authMiddleware,
  permit('ADMIN', 'TEACHER'),
  listStudentsController
);
router.post('/', authMiddleware, permit('ADMIN'), createStudentController);

export default router;
