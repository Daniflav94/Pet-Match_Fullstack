import express from "express";
import { register, login, getCurrentUser, forgetPassword, resetPassword, validateCode } from "../controllers/AuthController";
import { validate } from "../middlewares/handleValidation";
import {
  userCreateValidation,
  adminCreateValidation,
  loginValidation,
} from "../middlewares/authValidations";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";

const router = express.Router();

router.post("/login", loginValidation(), validate, login);
router.post("/register/user", userCreateValidation(), validate, register);
router.post("/register/admin", imageUpload.single("photo"), adminCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser)
router.post("/forget-password", validate, forgetPassword);
router.post("/validate-code", validate, validateCode);
router.post("/reset-password", validate, resetPassword);

module.exports = router;
