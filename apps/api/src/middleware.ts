import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.name) {
    case "DatabaseError":
      console.error(err);
      res.status(500).json({ message: "An internal server error occurred." });
      break;
    case "ValidationError":
      res.status(400).json({ message: err.message });
      break;
    case "AuthorizationError":
      res.status(403).json({ message: err.message });
      break;
    default:
      console.error(err);
      res.status(500).json({ message: "An internal server error occurred." });
  }
};

interface TokenPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // @ts-ignore
    req.userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
  next();
};
