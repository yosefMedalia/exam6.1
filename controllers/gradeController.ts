import { Request, Response } from 'express';
import GradeService from '../services/gradeService';

// הוספת ציון
export const addGrade = async (req: Request, res: Response) => {
    try {
        const { studentId, grade, comment } = req.body;
        const newGrade = await GradeService.addGrade(req.body.user._id, studentId, grade, comment);
        res.status(201).json({ message: 'Grade added successfully', newGrade });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// עדכון ציון
export const updateGrade = async (req: Request, res: Response) => {
    try {
        const { gradeId } = req.params;
        const { grade, comment } = req.body;
        const updatedGrade = await GradeService.updateGrade(req.body.user_id, gradeId, grade, comment);
        res.status(200).json({ message: 'Grade updated successfully', updatedGrade });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// קבלת ציונים של תלמיד
export const getStudentGrades = async (req: Request, res: Response) => {
    try {
        const grades = await GradeService.getStudentGrades(req.body.user._id);
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// קבלת ממוצע ציונים לכיתה
export const getClassAverage = async (req: Request, res: Response) => {
    try {
        const average = await GradeService.getClassAverage(req.body.user._id);
        res.status(200).json({ average });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// קבלת ציון של תלמיד מסוים
export const getStudentGrade = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const grade = await GradeService.getStudentGrade(req.body.user._id, studentId);
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
