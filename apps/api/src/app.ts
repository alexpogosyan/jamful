import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recordingsRoutes from "./routes/recordingsRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json("Hello World!");
});

app.use("/api/recordings", recordingsRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});

export default app;
