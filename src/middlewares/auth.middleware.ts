import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const AuthMiddleware = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(400).json({ message: "Token not provided" });
      }

      const [, token] = authHeader.split(" ");

      if (!token) {
        return res.status(400).json({ message: "Token not provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_KEY as string) as {
        id: number;
      };

      (req as any).userId = decoded.id;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },
};
