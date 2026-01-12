import { Router } from 'express';
import { getConversions, getConversionById } from '../controllers/conversions.controller.js';

/**
 * Routes for conversion history endpoints
 */
const router = Router();

// GET /conversions - Get conversion history
router.get('/', getConversions);

// GET /conversions/:id - Get conversion by ID
router.get('/:id', getConversionById);

export default router;

