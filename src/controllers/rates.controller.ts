import type { Request, Response } from 'express';
import { HttpError } from '../utils/httpError.js';

/**
 * Rates controller
 * Handles HTTP requests related to exchange rates
 */

/**
 * Get exchange rate between two currencies
 * GET /rates?base=USD&target=EUR
 */
export async function getRate(req: Request, res: Response): Promise<void> {
  throw new HttpError(501, 'Not implemented');
}

/**
 * Get multiple exchange rates for a base currency
 * GET /rates?base=USD&targets=EUR,GBP,JPY
 */
export async function getRates(req: Request, res: Response): Promise<void> {
  throw new HttpError(501, 'Not implemented');
}

