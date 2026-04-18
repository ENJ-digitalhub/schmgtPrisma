import { Router } from 'express';
import { createSchool, getSchoolStatus } from './school.controller.js';

const router = Router();

router.get('/', getSchoolStatus);
router.post('/', createSchool);

export default router;
