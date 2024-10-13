import { Router } from 'express';
import { addGrade, updateGrade, getStudentGrades, getClassAverage, getStudentGrade } from '../controllers/gradeController';
import { teacherAuth, studentAuth } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: ניהול ציונים
 */

/**
 * @swagger
 * /grade:
 *   post:
 *     summary: הוספת ציון לתלמיד על ידי מורה
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - grade
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: מזהה התלמיד
 *               grade:
 *                 type: number
 *                 description: הציון שניתן לתלמיד
 *     responses:
 *       200:
 *         description: ציון נוסף בהצלחה
 *       401:
 *         description: הרשאה לא תקינה
 */
router.post('/grade', teacherAuth, addGrade);

/**
 * @swagger
 * /grade/{gradeId}:
 *   put:
 *     summary: עדכון ציון על ידי מורה
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: gradeId
 *         in: path
 *         required: true
 *         description: מזהה הציון
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: number
 *                 description: הציון המעודכן
 *     responses:
 *       200:
 *         description: הציון עודכן בהצלחה
 *       401:
 *         description: הרשאה לא תקינה
 */
router.put('/grade/:gradeId', teacherAuth, updateGrade);

/**
 * @swagger
 * /student/grades:
 *   get:
 *     summary: קבלת כל הציונים לתלמיד מחובר
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: רשימת ציונים הוחזרה בהצלחה
 *       401:
 *         description: הרשאה לא תקינה
 */
router.get('/student/grades', studentAuth, getStudentGrades);

/**
 * @swagger
 * /class/average:
 *   get:
 *     summary: קבלת ממוצע כיתתי על ידי מורה מחובר
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ממוצע הציונים הוחזר בהצלחה
 *       401:
 *         description: הרשאה לא תקינה
 */
router.get('/class/average', teacherAuth, getClassAverage);

/**
 * @swagger
 * /grade/student/{studentId}:
 *   get:
 *     summary: קבלת ציון מסוים של תלמיד מחובר
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         description: מזהה התלמיד
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: הציון הוחזר בהצלחה
 *       401:
 *         description: הרשאה לא תקינה
 */
router.get('/grade/student/:studentId', studentAuth, getStudentGrade);

export default router;
