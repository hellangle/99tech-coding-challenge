import express from "express";
import cors from "cors";
import resourceRoutes from "./routes/resource.route";
import connectDB from "./config/db";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);

export default app;