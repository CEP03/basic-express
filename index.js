const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");

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

    // Tambahkan route root untuk testing
    app.get('/', (req, res) => {
      res.json({
        message: 'API is running successfully! 🚀',
        domain: 'api.cokrodev.xyz',
        timestamp: new Date().toISOString(),
        endpoints: [
          '/api/auth/login',
          '/api/auth/register',
          '/api/products',
          '/health'
        ],
        ssl: '✅ Active',
        server: 'Express.js + Docker + Nginx'
      });
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        database: 'Connected', // atau sesuaikan dengan status DB
        timestamp: new Date().toISOString()
      });
    });

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
