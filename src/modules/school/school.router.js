import { Router } from "express";
import {
  createAdminController,
  getAdminByEmailController,
  listAdminsController,
} from "./school.controller.js";
import {
  authMiddleware,
  permit,
} from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: School
 *     description: School administration and admin onboarding endpoints
 */

/**
 * @openapi
 * /api/schools/admins:
 *   post:
 *     tags:
 *       - School
 *     summary: Create a school admin
 *     description: Creates an auth user with the ADMIN role and then creates the linked admin profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdminRequest'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       500:
 *         description: Admin creation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     tags:
 *       - School
 *     summary: List admins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admins fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminListResponse'
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
router.post("/admins", createAdminController);
router.get("/admins", authMiddleware, permit("ADMIN"), listAdminsController);

/**
 * @openapi
 * /api/schools/admins/{email}:
 *   get:
 *     tags:
 *       - School
 *     summary: Fetch an admin by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: Admin fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
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
 *       404:
 *         description: Admin not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/admins/:email",
  authMiddleware,
  permit("ADMIN"),
  getAdminByEmailController
);

export default router;
