import express from "express";
import adminAuth from "../../middlewares/adminAuth.js";
import validate from "../../middlewares/validation.js";
import approvalValidation from "../../middlewares/joiValidation/admin/approval.js";
import { approveContent, listPending, rejectContent } from "../../controllers/admin/approval.controller.js";

const router = express.Router();
router.use(adminAuth.required);

router.get("/pending", listPending);
router.post("/:id/approve", validate({ params: approvalValidation.idParam }), approveContent);
router.post(
  "/:id/reject",
  validate({ params: approvalValidation.idParam, body: approvalValidation.reject }),
  rejectContent,
);

export default router;
