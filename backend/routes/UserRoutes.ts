import express from "express";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";
import { getCurrentUser, updateUser } from "../controllers/UserController";
import {
  adminUpdateValidation,
  userUpdateValidation
} from "../middlewares/userValidation";
import { validate } from "../middlewares/handleValidation";

const router = express.Router();

router.get("/profile", authGuard, getCurrentUser)
router.patch("/profile/admin/:id", authGuard, adminUpdateValidation(),validate, updateUser);
router.patch("/profile/user/:id", authGuard, userUpdateValidation(),validate, updateUser);


module.exports = router;
