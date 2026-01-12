import { Router } from 'express';
import { convert } from '../controllers/convert.controller.js';

/**
 * Routes for currency conversion endpoints
 */
const router = Router();

// POST /convert - Convert currency
router.post('/', convert);

export default router;

