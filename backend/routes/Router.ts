import express from "express";

const router = express();

router.use("/api/auth", require("./AuthRoutes"));
router.use("/api/pets", require("./PetRoutes"));

module.exports = router;
