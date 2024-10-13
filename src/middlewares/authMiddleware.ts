import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacherModel';
import Student from '../models/studentModel';

export const teacherAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const teacher = await Teacher.findById(decoded.id);
        if (!teacher) throw new Error('Authentication failed');

        req.body.user = teacher;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const studentAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const student = await Student.findById(decoded.id);
        if (!student) throw new Error('Authentication failed');

        req.body.user = student;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
