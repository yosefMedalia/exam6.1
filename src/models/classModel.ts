import { Schema, model, Document } from 'mongoose';

export interface IClass extends Document {
    name: string; 
    teacher: Schema.Types.ObjectId; // קישור למורה
}

const classSchema = new Schema<IClass>({
    name: {
         type: String,
         required: true 
        },
    teacher: { 
         type: Schema.Types.ObjectId,
         ref: 'Teacher', 
         required: true 
        }
}, { timestamps: true });

export default model<IClass>('Class', classSchema);
