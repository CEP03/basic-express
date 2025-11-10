const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

// Load models - this ensures they are registered with Sequelize
const User = require("./models/Users");
const Product = require("./models/Product");

async function startServer() {
  try {
    // Connect to database first
    await connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);

    // Sync database and create tables
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced (tables created successfully!)");
    console.log("📊 Models loaded:", Object.keys(sequelize.models));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("📋 Available tables:", Object.keys(sequelize.models));
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();
