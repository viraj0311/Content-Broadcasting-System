import express from "express";
import authRoute from "./auth.route.js";
import contentRoute from "./content.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/content", contentRoute);

export default router;
