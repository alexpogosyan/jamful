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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Header token:", token);

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    console.log("decoding:", err, decoded);
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }

    // if token is valid, set user id to request for further request operation
    // @ts-ignore
    req.userId = decoded.userId;
    next();
  });
};
