require("../config/db");
const historialModel = require("../models/historial.model");

const getHistorial = async (req, res) => {
  try {
    const historialClinicoBD = await historialModel.find();
    res.status(200).send(historialClinicoBD);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getHistorialPorCentro = async (req, res) => {
  const idCentro = req.params.idCentro;
  try {
    const historialClinicoBD = await historialModel.find({ idCentro });
    res.status(200).send(historialClinicoBD);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
  const historial = new historialModel(req.body);

  try {
    await historial.save();
    res.status(201).send(historial);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
