import { Request, Response } from "express";
import Resource from "../models/resource";

// Create a new resource
export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const resource = new Resource({ name, description });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error creating Resource" });
  }
};

// Get all Resources
export const getResources = async (req: Request, res: Response) => {
  try {
    const { keywords, sortBy, order, page, limit } = req.query;

    // Build the filter object
    let filter: any = {};
    let orConditions: any[] = [];

    if (keywords) {
      orConditions.push({ name: { $regex: keywords, $options: "i" } });
      orConditions.push({ description: { $regex: keywords, $options: "i" } });
    }

    if (orConditions.length > 0) {
      filter.$or = orConditions;
    }

    // Sorting options
    let sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = order === "desc" ? -1 : 1;
    }

    // Pagination options
    const pageNum = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * pageSize;

    // Fetch resources with filters, sorting, and pagination
    const resources = await Resource.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    // Get total count for pagination metadata
    const total = await Resource.countDocuments(filter);

    res.json({
      resources,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: pageNum,
      pageSize,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Resources" });
  }
};

// Get a single resource by ID
export const getResourceById = async (req: Request, res: Response) : Promise<any> => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource" });
  }
};

// Update resource
export const updateResource = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { name, description } = req.body;
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error updating resource" });
  }
};

// Delete resource
export const deleteResource = async (req: Request, res: Response) : Promise<any> => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource" });
  }
};