import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError.js";

export function errorMiddleware(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
  });
}

