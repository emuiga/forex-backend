import { Router } from "express";
import { getConversionsController } from "../controllers/conversions.controller.js";

const router = Router();

router.get("/", getConversionsController);

export default router;




