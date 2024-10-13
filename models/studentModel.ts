import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IStudent extends Document {
    name: string; 
    email: string; 
    password: string; 
    class: Schema.Types.ObjectId; // קישור לכיתה
    comparePassword(studentPassword: string): Promise<boolean>; 
}

const studentSchema = new Schema<IStudent>({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { type: String, 
        required: true 
    },
    class: { type: Schema.Types.ObjectId, 
        ref: 'Class', 
        required: true 
    }
}, { timestamps: true });

// הצפנת סיסמא לפני שמירה
studentSchema.pre<IStudent>('save', async function(next) {
    if (!this.isModified('password')) return next();
        //הצפנה וערבוב ה 10 זה salt
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//  פונקציה להשוואת סיסמאות
studentSchema.methods.comparePassword = async function(studentPassword: string) {
    return bcrypt.compare(studentPassword, this.password);
};

export default model<IStudent>('Student', studentSchema);
