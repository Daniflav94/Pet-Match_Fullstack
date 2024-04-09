import express from "express";
import { register, login, getCurrentUser } from "../controllers/AuthController";
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
router.post("/register/admin", adminCreateValidation(), validate, imageUpload.single("photo"), register);
router.get("/profile", authGuard, getCurrentUser)

module.exports = router;
