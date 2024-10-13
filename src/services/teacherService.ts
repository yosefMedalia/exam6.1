import Teacher from '../models/teacherModel';
import Class from '../models/classModel';
import bcrypt from 'bcryptjs';

class TeacherService {
    // רישום מורה חדש ויצירת כיתה
    async registerTeacher(name: string, email: string, password: string, className: string) {
        const teacher = new Teacher({ name, email, password });
        const newClass = new Class({ name: className, teacher: teacher._id });
        await newClass.save();
        //מוסיפים את ה איי די של הכיתה לרשימת הכיתות של המורה
        teacher.classes.push(newClass.id);
        await teacher.save();
        return { classId: newClass._id };
    }

    // כניסה של מורה
    async login(email: string, password: string) {
        const teacher = await Teacher.findOne({ email });
        if (teacher && await teacher.comparePassword(password)) {
            return teacher;
        }
        return null;
    }
}

export default new TeacherService();
