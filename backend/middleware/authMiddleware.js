const jwt = require("jsonwebtoken");
const Centro = require("../models/centro.model");
require("../config/db");

/**
 * Middleware para verificar si la sesión está activada y si el token de autenticación es válido.
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP con un mensaje de error o una redirección a la página de inicio de sesión si la sesión no está activada.
 */

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const decoded = jwt.verify(token, jwtSecret);

    const center = await Centro.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!center) {
      throw new Error('No se encontró el usuario');
    }

    req.token = token;
    req.center = center;
    next();
  } catch (error) {
    res.status(401).send({ error: 'No estás autenticado', details: error.message });
  }
};

/**
 * Middleware para asignar la sesión a la solicitud.
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP con un mensaje de error o una redirección a la página de inicio de sesión si la sesión no está activada.
 */
const setSession = (req, res, next) => {
  req.session.user = req.user;
  next();
};

module.exports = authMiddleware;

