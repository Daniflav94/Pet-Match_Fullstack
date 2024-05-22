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
router.put("/profile/admin/:id", authGuard, adminUpdateValidation(),validate, updateUser);
router.put("/profile/user/:id", authGuard, imageUpload.single("photo"), userUpdateValidation(),validate, updateUser);


module.exports = router;
