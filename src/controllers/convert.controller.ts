import type { Request, Response, NextFunction } from "express";
import { convertCurrency } from "../services/conversion.service.js";
import { HttpError } from "../utils/httpError.js";
import type { ConvertRequest } from "../schemas/convert.schema.js";

export async function convertController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { amount, baseCurrency, targetCurrency }: ConvertRequest = req.body;

    const result = await convertCurrency(amount, baseCurrency, targetCurrency);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }
    if (error instanceof Error) {
      if (error.message.includes("not found in exchange rates")) {
        next(new HttpError(400, error.message));
        return;
      }
      if (error.message.includes("Missing required environment variables")) {
        next(new HttpError(500, "Exchange rate service configuration error"));
        return;
      }
      if (error.message.includes("Exchange rate API") || error.message.includes("request failed")) {
        next(new HttpError(502, "Exchange rate service unavailable"));
        return;
      }
    }
    next(error);
  }
}

