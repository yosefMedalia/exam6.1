import { Request, Response } from 'express';
import TeacherService from '../services/teacherService';
import StudentService from '../services/studentService';
import { generateToken } from '../utils/jwtUtils';

// רישום מורה
export const registerTeacher = async (req: Request, res: Response) => {
    try {
        const { name, email, password, className } = req.body;
        const newTeacher = await TeacherService.registerTeacher(name, email, password, className);
        res.status(201).json({ message: 'Teacher registered successfully', classId: newTeacher.classId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// רישום תלמיד
export const registerStudent = async (req: Request, res: Response) => {
    try {
        const { name, email, password, classId } = req.body;
        const newStudent = await StudentService.registerStudent(name, email, password, classId);
        res.status(201).json({ message: 'Student registered successfully', studentId: newStudent._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// כניסה (גם למורה וגם לתלמיד)
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await TeacherService.login(email, password) || await StudentService.login(email, password);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
