import express from "express";
import teacherAuth from "../../middlewares/teacherAuth.js";
import validate from "../../middlewares/validation.js";
import teacherContentValidation from "../../middlewares/joiValidation/teacher/content.js";
import { uploadLocal, uploadS3 } from "../../middlewares/multer.js";
import { listMyContent, uploadContent } from "../../controllers/teacher/content.controller.js";

const router = express.Router();
router.use(teacherAuth.required);

router.post(
  "/upload",
  uploadLocal.single("file"),
  validate({ body: teacherContentValidation.uploadContent }),
  uploadContent,
);

router.post(
  "/upload/s3/:type",
  uploadS3.single("file"),
  validate({ body: teacherContentValidation.uploadContent }),
  uploadContent,
);
router.get("/list", listMyContent);

export default router;
