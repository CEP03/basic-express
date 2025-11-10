const { Sequelize } = require('sequelize');

// Force menggunakan IPv4 dengan mengoverride DNS lookup
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    // Force IPv4
    useIPv4: true,
    // Atau gunakan socket options
    socket: {
      family: 4
    }
  },
  // Tambahkan retry logic
  retry: {
    max: 3,
    timeout: 6000,
    match: [
      /ECONNREFUSED/,
      /ETIMEDOUT/, 
      /ENETUNREACH/,
      /EAI_AGAIN/
    ]
  }
});

// Alternative: Gunakan connection string dengan parameter IPv4
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require&family=4`;
// const sequelize = new Sequelize(connectionString);

module.exports = sequelize;