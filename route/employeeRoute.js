import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { UpdateEmployee } from "../controller/employeeController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// update employee
router.put(
  "/update-employee",
  isAuthenticated,
  upload.single("logo"),
  UpdateEmployee,
);

export default router;
