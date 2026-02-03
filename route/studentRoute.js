import express from 'express';
import { Init, CreateEducation, UpdateEducation, DeleteEducation, CreateWorkExperience } from '../controller/studentController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', Init);

// education create
router.post("/education", isAuthenticated, CreateEducation)

// update education
router.put("/education/:id", isAuthenticated, UpdateEducation)

// delete education
router.delete("/education/:id", isAuthenticated, DeleteEducation);

// create work experience
router.post("/work-experience", isAuthenticated, CreateWorkExperience)

// update work experience
// delete work experience

// project create
// update project
// delete project

// skill create
// delete skill


export default router;