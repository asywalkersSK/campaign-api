const express = require('express');
const jwt = require('jsonwebtoken');
const { Campaign } = require('../models/campaignModel');
const { Sequelize } = require('sequelize');

const router = express.Router();

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = decoded;
    next();
  });
}

// Crear campaña
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, start_date, end_date, budget, status } = req.body;
    const campaign = await Campaign.create({ title, start_date, end_date, budget, status });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear campaña', error });
  }
});

// Listar campañas con filtro por estado
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status } = req.query;
    const condition = status ? { where: { status } } : {};
    const campaigns = await Campaign.findAll(condition);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener campañas', error });
  }
});

// Editar campaña
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Campaign.update(req.body, { where: { id } });
    if (updated) {
      const updatedCampaign = await Campaign.findByPk(id);
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ message: 'Campaña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al editar campaña', error });
  }
});

// Eliminar campaña (solo super_admin)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Solo el super administrador puede eliminar campañas' });
  }

  try {
    const { id } = req.params;
    const deleted = await Campaign.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Campaña eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Campaña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar campaña', error });
  }
});

//Resumen de campañas
router.get('/dashboard', async (req, res) => {
  try {
    // Total de campañas
    const total = await Campaign.count();

    // Presupuesto acumulado
    const presupuesto = await Campaign.sum('budget');

    // Distribución por estado
    const distribucion = await Campaign.findAll({
      attributes: [
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('status')), 'cantidad']
      ],
      group: ['status']
    });

    // Formatear la respuesta
    const estados = distribucion.map(row => ({
      status: row.status,
      cantidad: parseInt(row.dataValues.cantidad)
    }));

    res.status(200).json({
      totalCampañas: total,
      presupuestoTotal: presupuesto,
      distribucionPorEstado: estados
    });
  } catch (error) {
    console.error('Error al obtener dashboard:', error);
    res.status(500).json({ message: 'Error al obtener datos del dashboard', error });
  }
});

//Lading Page por campaña
router.get('/landing/:campaign_id', async (req, res) => {
  const { campaign_id } = req.params;

  try {
    const campaign = await Campaign.findByPk(campaign_id, {
      attributes: ['title', 'description', 'estimated_range']
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada.' });
    }

    res.status(200).json({
      titulo: campaign.title,
      descripcion: campaign.description,
      alcanceEstimado: campaign.estimated_range
    });
  } catch (error) {
    console.error('Error al obtener campaña para landing:', error);
    res.status(500).json({ message: 'Error interno', error });
  }
});


module.exports = router;
