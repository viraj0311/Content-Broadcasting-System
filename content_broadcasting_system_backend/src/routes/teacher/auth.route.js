import express from "express";
import validate from "../../middlewares/validation.js";
import authValidation from "../../middlewares/joiValidation/teacher/auth.js";
import { loginTeacher, registerTeacher } from "../../controllers/teacher/auth.controller.js";

const router = express.Router();

router.post("/register", validate({ body: authValidation.register }), registerTeacher);
router.post("/login", validate({ body: authValidation.login }), loginTeacher);

export default router;
