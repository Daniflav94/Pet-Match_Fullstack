import express from "express";
import { validate } from "../middlewares/handleValidation";

import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";
import { petCreateValidation } from "../middlewares/petValidations";
import { deletePet, deletePetFavorite, filterPets, getAll, getAllPets, getMyPetsFavorites, getPetsAdmin, registerPet, savePetAsFavorite, updatePet } from "../controllers/PetController";

const router = express.Router();

router.post("/", authGuard, imageUpload.single("photo"), petCreateValidation(), validate, registerPet);
router.put("/:id", authGuard, validate, updatePet);
router.get("/", validate, getAllPets);
router.get("/get-all", validate, getAll);
router.get("/my-pets", authGuard, validate, getPetsAdmin);
router.post("/filter", validate, filterPets);
router.delete("/:id", authGuard, validate, deletePet);

router.post("/favorite/:id", authGuard, validate, savePetAsFavorite);
router.get("/favorite/", authGuard, validate, getMyPetsFavorites);
router.delete("/favorite/:id", authGuard, validate, deletePetFavorite);

module.exports = router;