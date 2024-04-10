import express from "express";
import { validate } from "../middlewares/handleValidation";

import { authGuard } from "../middlewares/authGuard";
import { adoptionCreateValidation } from "../middlewares/adoptionValidation";
import { getFormsAdoptionUser, registerFormAdoption } from "../controllers/AdoptionController";

const router = express.Router();

router.post("/", authGuard, adoptionCreateValidation(), validate, registerFormAdoption);
router.get("/", authGuard, validate, getFormsAdoptionUser);

module.exports = router;