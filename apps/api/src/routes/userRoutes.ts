import express, { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import * as User from "@jamful/types/user";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_AGE } from "@jamful/types/constants";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user: User.Gettable = await userService.create(email, password);

    const jwtToken = userService.makeJwtToken(user);

    res.cookie(AUTH_COOKIE_NAME, jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: AUTH_COOKIE_AGE,
      path: "/",
    });

    res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error && err.name === "ValidationError") {
      res.status(400).json({
        errorCode: "empty_password_not_allowed",
      });
    } else if (err instanceof Error && err.name === "DatabaseError") {
      res.status(409).json({
        errorCode: "email_already_exists",
      });
    } else {
      res.status(500).json({
        errorCode: "server_error",
      });
    }
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { loginId, password } = req.body;

    try {
      const user: User.Gettable = await userService.authenticate(
        loginId,
        password
      );

      const jwtToken = userService.makeJwtToken(user);

      res.cookie(AUTH_COOKIE_NAME, jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: AUTH_COOKIE_AGE,
        path: "/",
      });

      res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error && err.name === "AuthorizationError") {
        res.status(401).json({
          errorCode: "wrong_user_or_password",
        });
      } else {
        res.status(500).json({
          errorCode: "server_error",
        });
      }
    }
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.status(200);
});

router.get(
  "/me",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    try {
      const user = await userService.getMe(userId);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorCode: "server_error" });
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
      const user = await userService.updateMe(userId, displayName, bio, avatar);
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error && err.name === "AuthorizationError") {
        res.status(401).json({
          errorCode: "unauthorized_request",
        });
      } else {
        res.status(500).json({
          errorCode: "server_error",
        });
      }
    }
  }
);

export default router;
