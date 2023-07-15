import express, { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import * as User from "@jamful/types/user";
import { AuthorizationError } from "../errors";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { userId, email, password } = req.body;

  try {
    const user: User.Gettable = await userService.create(
      userId,
      email,
      password
    );

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { loginId, password } = req.body;

    try {
      const user: User.Gettable | null = await userService.login(
        loginId,
        password
      );
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/me",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    try {
      const u = await userService.getMe(userId);
      if (u) {
        res.status(200).json(u);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put(
  "/me",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const { displayName, bio, avatar } = req.body;

    try {
      const u = await userService.updateMe(userId, displayName, bio, avatar);
      if (u) {
        res.status(200).json(u);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
