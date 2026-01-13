import { HttpError } from "../utils/httpError.js";
export function errorMiddleware(err, req, res, next) {
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
//# sourceMappingURL=error.middleware.js.map