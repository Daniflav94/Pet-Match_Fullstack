import express from "express";
import { validate } from "../middlewares/handleValidation";

import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";
import { petCreateValidation } from "../middlewares/petValidations";
import { registerPet } from "../controllers/PetController";

const router = express.Router();

router.post("/", authGuard, imageUpload.single("photo"), petCreateValidation(), validate, registerPet);

module.exports = router;