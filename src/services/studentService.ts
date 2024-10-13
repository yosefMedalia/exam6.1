import Student from '../models/studentModel';

class StudentService {
    // רישום תלמיד חדש
    async registerStudent(name: string, email: string, password: string, classId: string) {
        const student = new Student({ name, email, password, class: classId });
        await student.save();
        return student;
    }

    // כניסה של תלמיד
    async login(email: string, password: string) {
        const student = await Student.findOne({ email });
        if (student && await student.comparePassword(password)) {
            return student;
        }
        return null;
    }
}

export default new StudentService();
