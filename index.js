import express from "express";
const app = express();
import { containerRoutes } from "./routes/containerRoutes.js";

app.use(express.json());

app.use("/containers", containerRoutes);

app.listen(8000, () => {
  console.log("Container server running on PORT:8000...");
});
