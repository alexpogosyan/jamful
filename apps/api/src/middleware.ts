import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

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

  if (!token) return res.status(401).json({ errorCode: "token_not_provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // @ts-ignore
    req.userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ errorCode: "invalid_token" });
  }
  next();
};
