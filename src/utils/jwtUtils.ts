import jwt from 'jsonwebtoken';

//   יצירת הטוקן
export const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: '1h', 
    });
};
