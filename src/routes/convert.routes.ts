import { Router } from "express";
import { convertController } from "../controllers/convert.controller.js";

const router = Router();

router.post("/", convertController);

export default router;

