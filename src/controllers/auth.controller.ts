import { Request, Response } from "express";
import { AppDataSource } from "../data-source.ts";
import { User } from "../entities/User.ts";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ email: email });

      if (user) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashPassword = await hash(password, 10);

      const newUser = userRepository.create({
        email: email,
        password: hashPassword,
      });

      await userRepository.save(newUser);

      return res.status(201).json({
        message: "User successfully created",
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ email: email });

      if (!user) {
        return res.status(400).json({ message: "Wrong email or password" });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Wrong email or password" });
      }

      const jwtPayload = {
        id: user.id,
      };

      const token = jwt.sign(jwtPayload, process.env.JWT_KEY as string, {
        expiresIn: "15m",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
