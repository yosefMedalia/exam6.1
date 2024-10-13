import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface ITeacher extends Document {
    name: string; 
    email: string; 
    password: string; 
    classes: Schema.Types.ObjectId[]; // רשימת כיתות
    comparePassword(teacherPassword: string): Promise<boolean>; 
}

const teacherSchema = new Schema<ITeacher>({
    name: { 
        type: String, 
        required: true 
    },
    email: { type: String, 
        required: true, 
        unique: true 
    },
    password: { type: String, 
        required: true 
    },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
}, { timestamps: true });

// הצפנת סיסמא לפני שמירה
teacherSchema.pre<ITeacher>('save', async function(next) {
    if (!this.isModified('password')) return next();
    //הצפנה וערבוב ה 10 זה salt
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//  פונקציה להשוואת סיסמאות
teacherSchema.methods.comparePassword = async function(teacherPassword: string) {
    return bcrypt.compare(teacherPassword, this.password);
};

export default model<ITeacher>('Teacher', teacherSchema);
