const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql', // Dialecto de la BD
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la BD');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
