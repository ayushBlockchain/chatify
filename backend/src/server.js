import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend/src → project root
const rootDir = path.resolve(__dirname, "../../");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDir, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(rootDir, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});