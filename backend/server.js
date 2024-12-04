const express = require("express");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citas.rutas");
const historialMedRouter = require("./routes/historialMed.rutas");
const usuarioRouter = require("./routes/usuario.rutas");
const centrosRouter = require("./routes/centro.ruta");
const cors = require("cors");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(usuarioRouter);
app.use(citasRouter);
app.use(historialMedRouter);
app.use(centrosRouter);

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
