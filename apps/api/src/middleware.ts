import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error middleware");

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
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Auth middleware");
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token:", token);

  // If there's no token, we assume public endpoint was requested
  if (!token) {
    return next();
  } else {
    try {
      const payload = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET!);
      req.userId = payload.userId;
      next();
    } catch (error) {
      next();
    }
  }
};
