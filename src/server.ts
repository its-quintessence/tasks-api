import express from "express";
import { config } from "dotenv";

config();

const server = express();

server.use(express.json());

const PORT = Number(process.env.PORT);

server.listen(PORT, () => console.log("Server Running: http://localhost:8000"));
