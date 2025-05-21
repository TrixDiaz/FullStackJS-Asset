import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/database.js";
import assetRoutes from "./routes/assetRoutes.js";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
const startServer = async () => {
  try {
    await connectDB();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error(`Server error: ${error.message}`);
      process.exit(1);
    });
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/assets", assetRoutes);

// Initialize server
startServer();
