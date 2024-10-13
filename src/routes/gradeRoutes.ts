import { Router } from 'express';
import { addGrade, updateGrade, getStudentGrades, getClassAverage, getStudentGrade } from '../controllers/gradeController';
import { teacherAuth, studentAuth } from '../middlewares/authMiddleware';

const router = Router();

// הוספת ציון למורה מחובר
router.post('/grade', teacherAuth, addGrade);

// שינוי ציון למורה מחובר
router.put('/grade/:gradeId', teacherAuth, updateGrade);

// קבלת כל הציונים רק לתלמיד עצמו
router.get('/student/grades', studentAuth, getStudentGrades);

// קבלת ממוצע כיתתי למורה מחובר
router.get('/class/average', teacherAuth, getClassAverage);

// קבלת ציון מסוים של תלמיד
router.get('/grade/student/:studentId', studentAuth, getStudentGrade);

export default router;
