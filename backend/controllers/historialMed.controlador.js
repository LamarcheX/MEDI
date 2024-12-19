require("../config/db");
const historialModel = require("../models/historial.model");

const getHistorial = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'fechaCreacion',
    sortOrder = 'desc',
    search = ''
  } = req.query;

  try {
    const searchQuery = search
      ? {
        $or: [
          { nombrePaciente: { $regex: search, $options: 'i' } },
          { diagnostico: { $regex: search, $options: 'i' } }
        ]
      }
      : {};

    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;

    const historialClinicoBD = await historialModel
      .find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const totalDocuments = await historialModel.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = Number(page);

    const response = {
      data: historialClinicoBD,
      pagination: {
        totalDocuments,
        totalPages,
        currentPage,
        pageSize: limit,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getHistorialPorCentro = async (req, res) => {
  const { idCentro } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = 'fechaCreacion',
    sortOrder = 'desc',
    search = ''
  } = req.query;

  try {
    if (!idCentro) {
      return res.status(400).send({ error: 'ID de centro es requerido' });
    }
    
    const searchQuery = search ? {
      $or: [
        { nombrePaciente: { $regex: search, $options: 'i' } },
        { diagnostico: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const combinedFilter = {
      idCentro,
      ...searchQuery
    };

    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;

    const historialClinicoBD = await historialModel
      .find(combinedFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const totalDocuments = await historialModel.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = Number(page);

    const response = {
      data: historialClinicoBD,
      pagination: {
        totalDocuments,
        totalPages,
        currentPage,
        pageSize: limit,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: 'Error al obtener el historial por centro'
    });
  }
};

const getOneHistorial = async (req, res) => {
  const id = req.params.id;
  try {
    const historialClinicoBD = await historialModel.findById(id);
    if (!historialClinicoBD) {
      return res.status(404).send({ message: "Historial no encontrado" });
    }
    res.status(200).send(historialClinicoBD);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addHistorial = async (req, res) => {
  try {
    // Convert fecha to Date object if it's a string
    if (req.body.fecha && typeof req.body.fecha === 'string') {
      req.body.fecha = new Date(req.body.fecha);
    }

    // Ensure fiscalia is a boolean
    req.body.fiscalia = req.body.fiscalia ?? false;

    const historial = new historialModel(req.body);
    await historial.save();
    res.status(201).send(historial);
  } catch (error) {
    console.error('Detailed Mongoose Error:', {
      message: error.message,
      name: error.name,
      errors: error.errors
    });
    res.status(500).send({
      error: 'Failed to create historical record',
      details: error.message,
      validationErrors: error.errors
    });
  }
};

const updateHistorial = async (req, res) => {
  try {
    const pacienteActualizado = await historialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pacienteActualizado) {
      return res.status(404).send({ message: "Paciente no encontrado" });
    }

    res.status(200).send(pacienteActualizado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteHistorial = async (req, res) => {
  try {
    const historiaEliminada = await historialModel.findByIdAndDelete(req.params.id);
    if (!historiaEliminada) {
      return res.status(404).send({ message: "Historia no encontrada" });
    }
    res.status(200).send({ message: "Historia eliminada con éxito" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getHistorial,
  getHistorialPorCentro,
  getOneHistorial,
  addHistorial,
  updateHistorial,
  deleteHistorial,
};
