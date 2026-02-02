import express from 'express';
import { Init, CreateEducation } from '../controller/studentController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', Init);

// education create
router.post("/education", isAuthenticated, CreateEducation)


export default router;