"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getResourceById = exports.getResources = exports.createResource = void 0;
const resource_1 = __importDefault(require("../models/resource"));
// Create a new resource
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const resource = new resource_1.default({ name, description });
        yield resource.save();
        res.status(201).json(resource);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating Resource" });
    }
});
exports.createResource = createResource;
// Get all Resources
const getResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keywords, sortBy, order, page, limit } = req.query;
        // Build the filter object
        let filter = {};
        let orConditions = [];
        if (keywords) {
            orConditions.push({ name: { $regex: keywords, $options: "i" } });
            orConditions.push({ description: { $regex: keywords, $options: "i" } });
        }
        if (orConditions.length > 0) {
            filter.$or = orConditions;
        }
        // Sorting options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        }
        // Pagination options
        const pageNum = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNum - 1) * pageSize;
        // Fetch resources with filters, sorting, and pagination
        const resources = yield resource_1.default.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        // Get total count for pagination metadata
        const total = yield resource_1.default.countDocuments(filter);
        res.json({
            resources,
            total,
            totalPages: Math.ceil(total / pageSize),
            currentPage: pageNum,
            pageSize,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Resources" });
    }
});
exports.getResources = getResources;
// Get a single resource by ID
const getResourceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resource_1.default.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json(resource);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching resource" });
    }
});
exports.getResourceById = getResourceById;
// Update resource
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const resource = yield resource_1.default.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json(resource);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating resource" });
    }
});
exports.updateResource = updateResource;
// Delete resource
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resource_1.default.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json({ message: "Resource deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting resource" });
    }
});
exports.deleteResource = deleteResource;
