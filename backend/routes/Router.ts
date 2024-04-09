import { Request, Response } from 'express';
import express from "express";

const router = express()

router.use("/api/auth", require("./AuthRoutes"))

module.exports = router