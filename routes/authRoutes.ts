import { Router } from 'express';
import { registerTeacher, registerStudent, login } from '../controllers/authController';

const router = Router();

// רישום מורה
router.post('/register/teacher', registerTeacher);

// רישום תלמיד
router.post('/register/student', registerStudent);

router.post('/login', login);

export default router;
