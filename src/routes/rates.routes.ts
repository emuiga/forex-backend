import { Router } from "express";
import { getRatesController } from "../controllers/rates.controller.js";

const router = Router();

router.get("/", getRatesController);

export default router;

