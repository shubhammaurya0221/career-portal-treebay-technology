import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import JobRouter from './routes/job.routes.js';
import ApplicationRouter from './routes/application.routes.js';
dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/jobs", JobRouter);  
app.use("/api/applications", ApplicationRouter);

const startServer = async()=>{
    try {
        await connectDB();

        app.listen(process.env.PORT,()=>{
            console.log(`server is running on ${process.env.PORT}`);
        })
    } catch (error) {
        console.error(`DATABASE connection failed : ${error}`)
    }
}

startServer();