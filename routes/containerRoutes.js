import express from "express";
import {
  listContainers,
  createContainer,
} from "../controllers/containerControllers.js";
const router = express.Router();

router.get("/", listContainers);
router.post("/", createContainer);

export { router as containerRoutes };
