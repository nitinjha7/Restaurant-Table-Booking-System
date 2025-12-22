import {getReservation, updateReservationStatus} from "../controllers/reservation.js";
import {getAdmin, logInAdmin, logOutAdmin} from "../controllers/adminController.js"
import {verifyAdmin } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/login", logInAdmin);
router.post("/logout", logOutAdmin);
router.get("/getAdmin", verifyAdmin, getAdmin);
router.get("/requests", verifyAdmin, getReservation);
router.patch("/status/:id", verifyAdmin, updateReservationStatus);

export default router;