const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

const app = express();


/*
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Shop API",
            description: "Backend Api",
            contact: {
                name: 'Amazing Developer'
            },
            servers: "http://localhost:3636"
        }
    },
    apis: ["app.js", ".routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
*/


/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

// app.use(logger('combined'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Import Routes
const projectRouter = require('./routes/project');
const userRouter = require('./routes/user');
// const authRouter = require('./routes/auth');
// const orderRouter = require('./routes/order');

// Define Routes
/**
 * @swagger
 * /api/projects:
 *   get:
 *    description: Get All Projects
 *
 */

// Use Routes
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/orders', orderRouter);

module.exports = app;