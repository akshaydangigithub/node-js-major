import express from "express";
import { InitAdmin, GetAllEmployees, GetAllStudents, GetAllInternships, UpdateEmployeeVerification } from "../controller/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isApproved.js";

const router = express.Router();

router.get("/init", isAuthenticated, isAdmin, InitAdmin);

router.get("/get-all-employess", isAuthenticated, isAdmin, GetAllEmployees)

router.get('/get-all-students', isAuthenticated, isAdmin, GetAllStudents)

router.get("/get-all-internships", isAuthenticated, GetAllInternships)

router.patch("/update-employee-verification/:id", isAuthenticated, isAdmin, UpdateEmployeeVerification)

export default router;