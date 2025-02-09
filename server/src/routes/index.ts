import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js';

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

export default router;