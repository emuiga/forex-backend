import type { Request, Response } from 'express';
import { HttpError } from '../utils/httpError.js';

/**
 * Convert controller
 * Handles HTTP requests for currency conversion
 */

/**
 * Convert currency
 * POST /convert
 * Body: { amount: number, baseCurrency: string, targetCurrency: string }
 */
export async function convert(req: Request, res: Response): Promise<void> {
  throw new HttpError(501, 'Not implemented');
}

