const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');


// Modelo de usuario
const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false, 
  });
  


// Buscar un usuario por su nombre
const findUserByUsername = async (username) => {
    try {
      const user = await User.findOne({ where: { username } });
      return user; // Devuelve el usuario si se encuentra
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    }
  };

// Registrar un usuario
const registerUser = async (username, password,role) => {
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar el usuario en la base de datos
        await User.create({ username, password: hashedPassword,role });
        return { message: 'Usuario creado con éxito.' };
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        
    }
};

// Listar todos los usuarios
const listAllUsers = async () => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'role'] 
      });
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      
    }
  };
// Sincroniza el modelo con la bd
User.sync()
  .then(() => console.log('Modelo de usuario sincronizado'))
  .catch((error) => console.log('Error al sincronizar el modelo:', error));

module.exports = {User, findUserByUsername,registerUser,listAllUsers};
