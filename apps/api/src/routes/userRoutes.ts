import express, { Request, Response } from "express";
import * as userService from "../services/userService";
import * as User from "@jamful/types/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { userId, email, password } = req.body;

  try {
    const user: User.Gettable = await userService.createUser(
      userId,
      email,
      password
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { loginId, password } = req.body;

  try {
    const user: User.Gettable | null = await userService.loginUser(
      loginId,
      password
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

export default router;
