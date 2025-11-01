import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { AuthMiddleware } from "../middleware/auth.middleware.ts";

export const authRouter = Router();

authRouter.post(
  "/register",
  AuthMiddleware.authenticate,
  AuthController.register
);
authRouter.post("/login", AuthController.login);
