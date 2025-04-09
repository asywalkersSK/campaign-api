const express = require('express');
const campaignRoutes = require('./routes/campaignRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // Esto es para manejar solicitudes con cuerpos en JSON

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Usar las rutas de campañas
app.use('/campaigns', campaignRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
