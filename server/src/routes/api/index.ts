import { Router } from 'express';
import ticketmasterRoutes from './ticketmasterRoutes.js';


const router = Router();
router.use('/event', ticketmasterRoutes);


export default router;