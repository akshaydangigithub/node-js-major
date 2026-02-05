import express from "express";
import {
  Init,
  CreateEducation,
  UpdateEducation,
  DeleteEducation,
  CreateWorkExperience,
  UpdateWorkExperience,
  DeleteWorkExperience,
  CreateProject,
  UpdateProject,
  DeleteProject,
  CreateSkill,
  DeleteSkill,
} from "../controller/studentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", Init);

// education create
router.post("/education", isAuthenticated, CreateEducation);

// update education
router.put("/education/:id", isAuthenticated, UpdateEducation);

// delete education
router.delete("/education/:id", isAuthenticated, DeleteEducation);

// create work experience
router.post("/work-experience", isAuthenticated, CreateWorkExperience);

// update work experience
router.put("/work-experience/:id", isAuthenticated, UpdateWorkExperience);

// delete work experience
router.delete("/work-experience/:id", isAuthenticated, DeleteWorkExperience);

// project create
router.post("/project", isAuthenticated, CreateProject);

// update project
router.put("/project/:id", isAuthenticated, UpdateProject);

// delete project
router.delete("/project/:id", isAuthenticated, DeleteProject);

// skill create
router.post("/skill", isAuthenticated, CreateSkill);

// delete skill
router.delete("/skill/:id", isAuthenticated, DeleteSkill);

export default router;
