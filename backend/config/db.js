const mongoose = require("mongoose");
const { EnvConfig } = require("../env");
require("dotenv").config();

/**
 * Configuración de la conexión a la base de datos.
 * **Nota:** En el archivo .env, debes configurar las variables de entorno de
 * la base de datos.
 */

try {
  mongoose.connect(EnvConfig().atlasUrl);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error(error);
}
