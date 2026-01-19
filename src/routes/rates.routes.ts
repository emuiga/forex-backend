import { Router } from "express";
import { getRatesController } from "../controllers/rates.controller.js";
import { validateQuery } from "../middlewares/validation.middleware.js";
import { RatesQuerySchema } from "../schemas/rates.schema.js";

const router = Router();

router.get("/", validateQuery(RatesQuerySchema), getRatesController);

export default router;



