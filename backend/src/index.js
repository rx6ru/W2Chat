import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import Cors from "cors"

import Morgan from "morgan"

dotenv.config();

const app = express();
const PORT = process.env.PORT
app.use(Morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(Cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

});
