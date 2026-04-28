import express from "express";
import liveRoute from "./live.route.js";

const router = express.Router();
router.use("/content", liveRoute);

export default router;
