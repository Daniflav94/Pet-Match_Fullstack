import express from "express";

const router = express();

router.use("/api/auth", require("./AuthRoutes"));
router.use("/api/pets", require("./PetRoutes"));
router.use("/api/adoption", require("./AdoptionRoutes"));

module.exports = router;
