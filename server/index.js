import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.route.js';
import { connectDb } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes);

app.listen(PORT, () => {
    connectDb();
    console.log("Server is started at PORT: ", PORT);
})



