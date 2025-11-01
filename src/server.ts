import express from "express";
import { config } from "dotenv";
import { AppDataSource } from "./data-source.ts";

config();

const server = express();

server.use(express.json());

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
