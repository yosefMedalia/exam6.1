import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Classroom Grade Management API',
        version: '1.0.0',
        description: 'API for managing classrooms, teachers, students, and grades',
    },
    servers: [
        {
            url: 'http://localhost:3000', 
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

export default swaggerDefinition;
