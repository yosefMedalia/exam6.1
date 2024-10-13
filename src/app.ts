import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import gradeRoutes from './routes/gradeRoutes';
import { connectToDatabase } from './services/database';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './utils/swaggerconfig';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const swaggerSpec = swaggerJsdoc({
    swaggerDefinition,  
    apis: ['./src/routes/*.ts'], 
});

//ממשק הסוואגר
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
//בקשות תמיכה 
app.use(cookieParser()); 
app.use(express.json()); 

app.use('/', authRoutes); 
app.use('/teachers', gradeRoutes); 

// התחברות למסד נתונים
connectToDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on port", PORT); 
});
