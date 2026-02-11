import express from "express";
import { InitAdmin } from "../controller/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isApproved.js";

const router = express.Router();


router.get("/init", isAuthenticated, isAdmin, InitAdmin)


export default router;