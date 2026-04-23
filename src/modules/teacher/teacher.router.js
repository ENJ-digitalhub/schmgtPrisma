import { Router } from "express";
import {
  createTeacherController,
  listTeachersController,
} from "./teacher.controller.js";
import {
  authMiddleware,
  permit,
} from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Teacher
 *     description: Teacher management endpoints
 */

/**
 * @openapi
 * /api/teachers:
 *   get:
 *     tags:
 *       - Teacher
 *     summary: List teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teachers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherListResponse'
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
 *       - Teacher
 *     summary: Create a teacher scaffold record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacherRequest'
 *     responses:
 *       201:
 *         description: Teacher scaffold created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherResponse'
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
router.get("/", authMiddleware, permit("ADMIN"), listTeachersController);
router.post("/", authMiddleware, permit("ADMIN"), createTeacherController);

export default router;
