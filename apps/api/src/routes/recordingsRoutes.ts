import express, { NextFunction, Request, Response } from "express";
import * as recordingsService from "../services/recordingsService";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordings = await recordingsService.getAll();
    res.status(200).json(recordings);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const recording = await recordingsService.getById(id);
    res.status(200).json(recording);
  } catch (err) {
    next(err);
  }
});

export default router;
