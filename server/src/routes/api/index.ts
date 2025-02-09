import { Router } from 'express';
import ticketmasterRoutes from './ticketmasterRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();
router.use('/event', ticketmasterRoutes);
router.use('/users', userRoutes);

export default router;