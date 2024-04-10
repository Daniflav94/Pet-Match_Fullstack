import express from "express";
import { validate } from "../middlewares/handleValidation";

import { authGuard } from "../middlewares/authGuard";
import { getNotifications, updateNotification } from "../controllers/NotificationsController";

const router = express.Router();

router.put("/:id", authGuard,validate, updateNotification);
router.get("/", authGuard, validate, getNotifications);

module.exports = router;