import { Router } from "express";
import { TaskController } from "../controllers/task.controller.ts";
import { AuthMiddleware } from "../middlewares/auth.middleware.ts";

export const taskRouter = Router();

taskRouter.post("/create", AuthMiddleware.authenticate, TaskController.create);
taskRouter.get("/list", AuthMiddleware.authenticate, TaskController.list);
taskRouter.post(
  "/toggle-status",
  AuthMiddleware.authenticate,
  TaskController.toggleStatus
);
