const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citas.rutas");
const historialMedRouter = require("./routes/historialMed.rutas");
const usuarioRouter = require("./routes/usuario.rutas");
const cors = require("cors");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

// SERVER TEST
app.get("/", (req, res) => {
  res.status(200).json({
    Saludo: req.query.Saludo || "Hola Mundo Test",
    Status: req.query.Status || "SERVIDOR CORRIENDO",
  });
});

app.post("/", (req, res) => {
  res.status(200).json({
    Saludo: req.body.Saludo,
    Status: req.body.Status,
  });
});

app.use(usuarioRouter);
app.use(citasRouter);
app.use(historialMedRouter);

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
