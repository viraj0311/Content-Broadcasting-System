import express from "express";
import validate from "../../middlewares/validation.js";
import authValidation from "../../middlewares/joiValidation/admin/auth.js";
import { loginPrincipal, registerPrincipal } from "../../controllers/admin/auth.controller.js";

const router = express.Router();

router.post("/register", validate({ body: authValidation.register }), registerPrincipal);
router.post("/login", validate({ body: authValidation.login }), loginPrincipal);

export default router;
