import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../swagger.json'; 
import authRoutes from './routes/authRoutes';
import  gradeRoutes from './routes/gradeRoutes';
import {connectToDatabase} from './services/database';

import cookieParser from 'cookie-parser';
dotenv.config();







const app = express();

app.use(cookieParser());

app.use(express.json());
app.use('/register', authRoutes)
app.use('/teachers', gradeRoutes);





connectToDatabase();
const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
    console.log("server is raning to port",PORT);

    
})

