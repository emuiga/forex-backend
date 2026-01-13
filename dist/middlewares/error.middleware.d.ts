import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError.js";
export declare function errorMiddleware(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=error.middleware.d.ts.map