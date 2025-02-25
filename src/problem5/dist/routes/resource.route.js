"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rate_limiter_1 = require("../middleware/rate.limiter");
const resource_controller_1 = require("../controllers/resource.controller");
const router = express_1.default.Router();
router.post("/", rate_limiter_1.rateLimiter, resource_controller_1.createResource);
router.get("/", rate_limiter_1.rateLimiter, resource_controller_1.getResources);
router.get("/:id", rate_limiter_1.rateLimiter, resource_controller_1.getResourceById);
router.put("/:id", rate_limiter_1.rateLimiter, resource_controller_1.updateResource);
router.delete("/:id", rate_limiter_1.rateLimiter, resource_controller_1.deleteResource);
exports.default = router;
