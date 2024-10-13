import Grade from '../models/gradeModel';
import Class from '../models/classModel';
import Teacher from '../models/teacherModel';

class GradeService {
    // הוספת ציון לתלמיד
    async addGrade(teacherId: string, studentId: string, grade: number, comment: string) {
        const teacher = await Teacher.findById(teacherId);
        const studentClass = await Class.findOne({ students: studentId, teacher: teacherId });
        if (!studentClass) throw new Error('Unauthorized action');

        const newGrade = new Grade({ student: studentId, grade, comment });
        await newGrade.save();
        return newGrade;
    }

    // עדכון ציון של תלמיד
    async updateGrade(teacherId: string, gradeId: string, grade: number, comment: string) {
        const gradeRecord = await Grade.findById(gradeId);
        if (!gradeRecord) throw new Error('Grade not found');
        const studentClass = await Class.findOne({ students: gradeRecord.student, teacher: teacherId });
        if (!studentClass) throw new Error('Unauthorized action');

        gradeRecord.grade = grade;
        gradeRecord.comment = comment;
        await gradeRecord.save();
        return gradeRecord;
    }

    // קבלת כל הציונים של תלמיד
    async getStudentGrades(studentId: string) {
        const grades = await Grade.find({ student: studentId });
        return grades;
    }

    // קבלת ממוצע ציונים לכיתה
    async getClassAverage(teacherId: string) {
        const classData = await Class.findOne({ teacher: teacherId }).populate('students');
        const grades = await Grade.find({ student: {$in: classData.students}});
        const average = grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length;
        return average;
    }

    // קבלת ציון של תלמיד
    async getStudentGrade(teacherId: string, studentId: string) {
        const studentClass = await Class.findOne({ students: studentId, teacher: teacherId });
        if (!studentClass) throw new Error('Unauthorized action');
        const grade = await Grade.findOne({ student: studentId });
        return grade;
    }
}

export default new GradeService();
