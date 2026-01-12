import type { Request, Response } from 'express';
import { HttpError } from '../utils/httpError.js';

/**
 * Conversions controller
 * Handles HTTP requests related to conversion history
 */

/**
 * Get conversion history
 * GET /conversions
 */
export async function getConversions(req: Request, res: Response): Promise<void> {
  throw new HttpError(501, 'Not implemented');
}

/**
 * Get conversion by ID
 * GET /conversions/:id
 */
export async function getConversionById(req: Request, res: Response): Promise<void> {
  throw new HttpError(501, 'Not implemented');
}

