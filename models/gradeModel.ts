import { Schema, model, Document } from 'mongoose';


export interface IGrade extends Document {
    student: Schema.Types.ObjectId; // קישור לתלמיד
    grade: number; 
    comment: string; 
    dateAdded: Date; 
}


const gradeSchema = new Schema<IGrade>({
    student: {
         type: Schema.Types.ObjectId,
         ref: 'Student',
         required: true 
        },
    grade: {
         type: Number,
         required: true 
        },
    comment: { type: String,
         required: true 
        },
    dateAdded: { type: Date,
         default: Date.now 
        }
}, { timestamps: true });

export default model<IGrade>('Grade', gradeSchema);
