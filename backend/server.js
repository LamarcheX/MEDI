const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citasRutas");
const historialMedRouter = require("./routes/historialMedRutas");
const inventarioRutas = require("./routes/inventarioRutas")
const cors = require("cors")


require("dotenv").config();
require("./config/db");


const app = express();

app.use(cookieParser());
//app.use(express.json())
app.use(express.json({ extended: false }));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

// SERVER TEST
app.get("/", (req, res) => {
  res.send("Hola Mundo SERVIDOR CORRIENDO desde Express");
  console.log('corriendooo')
});

// app.use(express.json);

app.use(citasRouter);
app.use(historialMedRouter);
app.use(inventarioRutas)


const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
