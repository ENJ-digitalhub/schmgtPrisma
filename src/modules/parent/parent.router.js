import { Router } from "express";
import {
  createParentController,
  listParentsController,
} from "./parent.controller.js";
import {
  authMiddleware,
  permit,
} from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Parent
 *     description: Parent management endpoints
 */

/**
 * @openapi
 * /api/parents:
 *   get:
 *     tags:
 *       - Parent
 *     summary: List parents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Parents fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParentListResponse'
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
 *       - Parent
 *     summary: Create a parent scaffold record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateParentRequest'
 *     responses:
 *       201:
 *         description: Parent scaffold created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParentResponse'
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
router.get("/", authMiddleware, permit("ADMIN"), listParentsController);
router.post("/", authMiddleware, permit("ADMIN"), createParentController);

export default router;
