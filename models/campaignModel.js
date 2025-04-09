const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//Modelo de las campañas
const Campaign = sequelize.define('Campaign', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { 
    type: DataTypes.TEXT,
    allowNull: true,
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimated_range: { 
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: false
});

module.exports = Campaign;


Campaign.sync()
  .then(() => console.log('Modelo de campaña sincronizado'))
  .catch((error) => console.log('Error al sincronizar campañas:', error));

module.exports = { Campaign };
