import express, { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import * as User from "@jamful/types/user";

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

export default router;
