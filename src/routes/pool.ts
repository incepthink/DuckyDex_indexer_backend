import { Router } from "express";
import { getPools } from "../controllers/pool";

const router = Router();

router.get("/", getPools);

export default router;
