import type { Request, Response, NextFunction } from "express";
import { getConversions } from "../services/conversion.service.js";

export async function getConversionsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const conversions = await getConversions();

    res.json(conversions);
  } catch (error) {
    next(error);
  }
}

