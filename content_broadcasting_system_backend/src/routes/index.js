import express from "express";
import adminRoutes from "./admin/index.js";
import teacherRoutes from "./teacher/index.js";
import publicRoutes from "./public/index.js";

const router = express.Router();

router.get("/health", (req, res) => res.send("Health Ok"));
router.use("/api/admin/v1", adminRoutes);
router.use("/api/teacher/v1", teacherRoutes);
router.use("/api/public/v1", publicRoutes);

export default router;
