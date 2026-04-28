import express from "express";
import authRoute from "./auth.route.js";
import approvalRoute from "./approval.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/content", approvalRoute);

export default router;
