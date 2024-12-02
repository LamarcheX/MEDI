const express = require("express");
const {
    getHistorial,
    getHistorialPorCentro,
    getOneHistorial,
    addHistorial,
    updateHistorial,
    deleteHistorial,
} = require("../controllers/historialMed.controlador");

const router = new express.Router();

router.get("/api/historial-clinico", getHistorial);

router.get("/api/historial-clinico/:id", getOneHistorial);

router.post("/api/historial-clinico", addHistorial);

router.patch("/api/historial-clinico/:id", updateHistorial);

router.delete("/api/historial-clinico/:id", deleteHistorial);

router.get("/api/historial-clinico/centro/:idCentro", getHistorialPorCentro);

// router.use(authMiddleware);

module.exports = router;
