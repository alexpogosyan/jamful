import express, { Request, Response } from "express";
import * as recordingsService from "../services/recordingsService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const recordings = await recordingsService.getAll();
    res.status(200).json(recordings);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const recording = await recordingsService.getById(id);
    res.status(200).json(recording);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

export default router;
