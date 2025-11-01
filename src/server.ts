import express from "express";
import { config } from "dotenv";
import { AppDataSource } from "./data-source.ts";
import { authRouter } from "./routes/auth.router.ts";
import { AuthMiddleware } from "./middleware/auth.middleware.ts";

config();

const server = express();

server.use(express.json());

// API Routes
server.use("/auth", authRouter);

server.use("/tasks", AuthMiddleware.authenticate);

const PORT = Number(process.env.PORT);

try {
  await AppDataSource.initialize();
  console.log("✅ Database Connection Estabilished");
  server.listen(PORT, () =>
    console.log(`✅ Server running at http://localhost:${PORT}`)
  );
} catch (error) {
  console.error("❌ Failed to start server:", error as string);
}
