import express from "express";
import { getLiveContent } from "../../controllers/public/live.controller.js";

const router = express.Router();
router.get("/live/:teacherId", getLiveContent);

export default router;
