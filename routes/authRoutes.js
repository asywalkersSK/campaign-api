const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser,
        findUserByUsername,
        listAllUsers } = require('../models/userModel');

const router = express.Router();

//Login con JWT
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en la bd
    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Crear el JWT con username y role 
    const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET, // Clave secreta
        { expiresIn: '1h' } // Expiración del token (1 hora)
    );

    // Devolver el token
    res.status(200).json({ token });
});

//Registro de Usuarios (solo super-Administrador puede crear Administrador).
router.post('/register', async (req, res) => {
    const { username, password,role } = req.body;

    // Verificar el token antes de permitir el registro
    const token = req.headers['authorization']?.split(' ')[1];  // Obtener el token del header

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verificar que el token es válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("decode:",decoded);
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        // Verificar si el rol es 'super_admin'
        if (decoded.role !== 'super_admin') {
            return res.status(403).json({ message: 'Solo un super administrador puede crear usuarios.' });
        }

        // Si el token es válido y el rol es correcto, continuar con el registro
        registerUser(username, password,role)
            .then((result) => res.status(201).json(result))
            .catch((error) => res.status(500).json({ message: error.message }));
    });
});

//Listado de usuarios (solo super Administrador)
router.get('/users', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        if (decoded.role !== 'super_admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        try {
            const users = await listAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
});

module.exports = router;
