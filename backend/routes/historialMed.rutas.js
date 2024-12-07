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

router.get("/api/historial-clinico/byCenter/:idCentro", getHistorialPorCentro);

router.patch("/api/historial-clinico/:id", updateHistorial);

router.delete("/api/historial-clinico/:id", deleteHistorial);

// router.use(authMiddleware);

module.exports = router;
