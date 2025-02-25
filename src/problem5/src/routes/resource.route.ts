import express from "express";
import { rateLimiter } from "../middleware/rate.limiter";
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller";

const router = express.Router();

router.post("/", rateLimiter, createResource);
router.get("/", rateLimiter, getResources);
router.get("/:id", rateLimiter, getResourceById);
router.put("/:id", rateLimiter, updateResource);
router.delete("/:id", rateLimiter, deleteResource);

export default router;