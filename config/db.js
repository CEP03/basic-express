const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
      schema: "public",
    },
    logging: false, // disable SQL logging
    //     logging: (sql, timing) => {
    //   console.log(`🔍 Query: ${sql}`);
    //   if (timing) console.log(`⏱️  Execution time: ${timing}ms`);
    // },
    // benchmark: true
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

module.exports = { sequelize, connectDB };
