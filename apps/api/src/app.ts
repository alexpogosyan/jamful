import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recordingsRoutes from "./routes/recordingsRoutes";
import userRoutes from "./routes/userRoutes";
import { errorMiddleware, authMiddleware } from "./middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/recordings", recordingsRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);
app.use(authMiddleware);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});

export default app;
