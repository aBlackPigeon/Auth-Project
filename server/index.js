import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.route.js';
import { connectDb } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;
const __dirname = path.resolve();

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDb();
    console.log("Server is started at PORT: ", PORT);
})



