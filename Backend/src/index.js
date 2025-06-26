import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";

dotenv.config({path: ".env"});

const app = express();
connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.use("/api/users", userRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
