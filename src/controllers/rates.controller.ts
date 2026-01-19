import type { Request, Response, NextFunction } from "express";
import { getRates } from "../services/exchangeRate.service.js";
import { HttpError } from "../utils/httpError.js";
import type { RatesQuery } from "../schemas/rates.schema.js";

export async function getRatesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { base }: RatesQuery = req.query as any;

    const rates = await getRates(base);

    if (!rates || typeof rates !== "object" || Object.keys(rates).length === 0) {
      throw new HttpError(400, "Invalid base currency");
    }

    res.json({
      base,
      rates,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }
    if (error instanceof Error) {
      if (error.message.includes("Missing required environment variables")) {
        next(new HttpError(500, "Exchange rate service configuration error"));
        return;
      }
      if (error.message.includes("Failed to fetch") || error.message.includes("Exchange rate API")) {
        next(new HttpError(502, "Exchange rate service unavailable"));
        return;
      }
    }
    next(error);
  }
}

