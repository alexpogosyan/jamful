import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.name) {
    case "DatabaseError":
      console.error(err);
      res.status(500).json({ message: "An internal server error occurred." });
      break;
    case "ValidationError":
      res.status(400).json({ message: err.message });
      break;
    default:
      console.error(err);
      res.status(500).json({ message: "An internal server error occurred." });
  }
};
