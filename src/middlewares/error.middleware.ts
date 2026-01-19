import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError.js";

export function errorMiddleware(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof HttpError) {
    const response: { error: string; details?: unknown } = {
      error: err.message,
    };
    if (err.details) {
      response.details = err.details;
    }
    res.status(err.statusCode).json(response);
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
  });
}

