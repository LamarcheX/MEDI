const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citaMedicaSchema = new Schema({
  especialista: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  tipo_servicio: { type: String, required: true },
  estado: { type: String, enum: ["confirmada", "pendiente"], default: "pendiente" },
  paciente_nombre: { type: String, required: true },
  paciente_edad: { type: Number, required: true },
  paciente_nacionalidad: { type: String, required: true },
  paciente_cedula: { type: String, trim: true, required: true },
  paciente_genero: { type: String, trim: true, required: true },
  paciente_direccion: { type: String, required: true },
  tipo_paciente: { type: String, trim: true },
  solicitante_nombre: { type: String, required: true },
  solicitante_apellido: { type: String, required: true },
  afiliacion_ars: { type: String, required: true },
  centro_nombre: { type: String, required: true },
  centro_id: { type: mongoose.Schema.Types.ObjectId, ref: "Centros", required: true },
});

const citaMedica = mongoose.model("Citas", citaMedicaSchema);

module.exports = citaMedica;
