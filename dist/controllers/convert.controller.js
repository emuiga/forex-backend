import { convertCurrency } from "../services/conversion.service.js";
import { HttpError } from "../utils/httpError.js";
export async function convertController(req, res, next) {
    try {
        if (!req.body || typeof req.body !== "object") {
            throw new HttpError(400, "Request body is required");
        }
        const { amount, baseCurrency, targetCurrency } = req.body;
        if (amount === undefined || amount === null) {
            throw new HttpError(400, "amount is required");
        }
        if (typeof amount !== "number" || isNaN(amount)) {
            throw new HttpError(400, "amount must be a number");
        }
        if (amount <= 0) {
            throw new HttpError(400, "amount must be greater than 0");
        }
        if (baseCurrency === undefined || baseCurrency === null) {
            throw new HttpError(400, "baseCurrency is required");
        }
        if (typeof baseCurrency !== "string") {
            throw new HttpError(400, "baseCurrency must be a string");
        }
        if (targetCurrency === undefined || targetCurrency === null) {
            throw new HttpError(400, "targetCurrency is required");
        }
        if (typeof targetCurrency !== "string") {
            throw new HttpError(400, "targetCurrency must be a string");
        }
        const normalizedBaseCurrency = baseCurrency.toUpperCase();
        const normalizedTargetCurrency = targetCurrency.toUpperCase();
        const result = await convertCurrency(amount, normalizedBaseCurrency, normalizedTargetCurrency);
        res.status(201).json(result);
    }
    catch (error) {
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
            if (error.message.includes("Failed to fetch") || error.message.includes("Exchange rate API")) {
                next(new HttpError(502, "Exchange rate service unavailable"));
                return;
            }
        }
        next(error);
    }
}
//# sourceMappingURL=convert.controller.js.map