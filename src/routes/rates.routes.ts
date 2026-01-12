import { Router } from 'express';
import { getRate } from '../controllers/rates.controller.js';

/**
 * Routes for exchange rates endpoints
 */
const router = Router();

// GET /rates - Get exchange rate(s)
// Query params: base, target (single) or base, targets (multiple)
router.get('/', getRate);

export default router;

