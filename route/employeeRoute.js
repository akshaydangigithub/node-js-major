import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { UpdateEmployee, GetProfile } from "../controller/employeeController.js";
import { upload } from "../config/multer.js";
import { isApproved } from "../middlewares/isApproved.js";

const router = express.Router();

// update employee
router.put(
  "/update-employee",
  isAuthenticated,
  upload.single("logo"),
  UpdateEmployee,
);

router.get("/me", isAuthenticated, GetProfile)

export default router;
