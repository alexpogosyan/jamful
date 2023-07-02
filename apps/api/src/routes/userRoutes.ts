import express, { Request, Response } from "express";
import * as userService from "../services/userService";
import * as User from "@jamful/types/user";
import { verify, hash } from "argon2";
import * as jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { userId, email, password } = req.body;

  try {
    const user: User.Selectable = await userService.createUser(
      userId,
      email,
      password
    );

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const data = {
      token,
      userId: user.userId,
      email: user.email,
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { loginId, password } = req.body;

  try {
    const user: User.Selectable | null = await userService.getByUserIdOrEmail(
      loginId
    );

    if (!user) {
      return res.json("User doesn't exist or wrong password");
    }

    const hashed = await hash(password);
    const passwordMatch = verify(hashed, user.passwordHash);

    if (!passwordMatch) {
      return res.json("User doesn't exist or wrong password");
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const data = {
      token,
      userId: user.userId,
      email: user.email,
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

export default router;
