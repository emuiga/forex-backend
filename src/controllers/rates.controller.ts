import type { Request, Response, NextFunction } from "express";
import { getRates } from "../services/exchangeRate.service.js";
import { HttpError } from "../utils/httpError.js";

export async function getRatesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const baseCurrency = (req.query.base as string) || "USD";

    const normalizedBaseCurrency = baseCurrency.toUpperCase();

    const rates = await getRates(normalizedBaseCurrency);

    if (!rates || typeof rates !== "object" || Object.keys(rates).length === 0) {
      throw new HttpError(400, "Invalid base currency");
    }

    res.json({
      base: normalizedBaseCurrency,
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

