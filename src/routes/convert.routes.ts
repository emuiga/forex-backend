import { Router } from "express";
import { convertController } from "../controllers/convert.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { ConvertRequestSchema } from "../schemas/convert.schema.js";

const router = Router();

router.post("/", validateBody(ConvertRequestSchema), convertController);

export default router;



