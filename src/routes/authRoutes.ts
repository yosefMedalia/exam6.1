import { Router } from 'express';
import { registerTeacher, registerStudent, login } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: ניהול הרשאות (מורים ותלמידים)
 */

/**
 * @swagger
 * /register/teacher:
 *   post:
 *     summary: רישום מורה חדש
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - className
 *             properties:
 *               name:
 *                 type: string
 *                 description: שם המורה
 *               email:
 *                 type: string
 *                 description: כתובת האימייל של המורה
 *               password:
 *                 type: string
 *                 description: סיסמה
 *               className:
 *                 type: string
 *                 description: שם הכיתה שנוצרת עבור המורה
 *     responses:
 *       200:
 *         description: הצלחה ביצירת מורה וכיתה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classId:
 *                   type: string
 *                   description: מזהה הכיתה שנוצרה
 *       400:
 *         description: בעיה בהרשמה
 */
router.post('/register/teacher', registerTeacher);

/**
 * @swagger
 * /register/student:
 *   post:
 *     summary: רישום תלמיד חדש
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - classId
 *             properties:
 *               name:
 *                 type: string
 *                 description: שם התלמיד
 *               email:
 *                 type: string
 *                 description: כתובת האימייל של התלמיד
 *               password:
 *                 type: string
 *                 description: סיסמה
 *               classId:
 *                 type: string
 *                 description: מזהה הכיתה אליה התלמיד משתייך
 *     responses:
 *       200:
 *         description: הצלחה ברישום התלמיד
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentId:
 *                   type: string
 *                   description: מזהה התלמיד
 *       400:
 *         description: שגיאה בהרשמת סטודנט
 */
router.post('/register/student', registerStudent);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: כניסה למערכת
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: כתובת האימייל
 *               password:
 *                 type: string
 *                 description: סיסמה
 *     responses:
 *       200:
 *         description: הצלחה בכניסה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: טוקן התחברות (JWT)
 *       401:
 *         description:שגיאה בהתחברות אימייל או סיסמה שגויים  
 */
router.post('/login', login);

export default router;
