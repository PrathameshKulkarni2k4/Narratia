import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";
// import { initializeSocket } from "./utils/socket.js";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

const app = express();

// Middleware setup
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" })); // Set a limit for JSON body size
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Set a limit for URL-encoded body size
app.use(express.static("public")); // Serve static files from 'public' directory
app.use(cookieParser()); // Parse cookies

// Create the HTTP server
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN, // Allow frontend from this origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize socket events
// initializeSocket(io);
// app.set('io', io);

// Import routes
import userRoute from "./routes/user.route.js"

app.use("/api/users", userRoute);



app.use(errorHandler);


export { app, httpServer };
