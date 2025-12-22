import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from "./database/dbConnect.js";
import reservationRouter from './routes/reservationRoute.js';
import adminRoute from './routes/adminRoute.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/reservation', reservationRouter);
app.use('/admin', adminRoute);

dbConnection();

export default app;