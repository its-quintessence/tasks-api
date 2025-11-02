import { Request, Response } from "express";
import { AppDataSource } from "../data-source.ts";
import { User } from "../entities/User.ts";
import { Task } from "../entities/Task.ts";

export const TaskController = {
  create: async (req: Request, res: Response) => {
    try {
      const { label } = req.body;
      const userId = (req as any).userId;

      if (!label) {
        return res.status(400).json({ message: "Label must be provided" });
      }

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const taskRepository = AppDataSource.getRepository(Task);

      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const newTask = taskRepository.create({ label, user });

      await taskRepository.save(newTask);

      return res
        .status(201)
        .json({ message: "Task created successfully", task: newTask.label });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  list: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const taskRepository = AppDataSource.getRepository(Task);

      const tasks = await taskRepository.find({
        where: { user: { id: userId } },
        order: { id: "DESC" },
      });

      return res.status(200).json({ tasks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
