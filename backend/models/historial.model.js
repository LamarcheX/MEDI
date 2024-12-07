const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historiaClinicaSchema = new Schema({
    fecha: { type: Date, required: true },
    mes: { type: String, required: true },
    especialista: { type: String, required: true },
    tipoDeServicio: { type: String, required: true },
    nombrePaciente: { type: String, required: true },
    edad: { type: Number, required: true },
    nacionalidad: { type: String, required: true },
    noCedula: { type: Number, required: true },
    genero: { type: String, required: true },
    solicitante: { type: String, required: true },
    nombreSolicitante: { type: String, required: true },
    direccion: { type: String, required: true },
    tipoDePaciente: { type: String, required: true },
    afiliacionArs: { type: String, required: true },
    categoriaDiagnostico: { type: String, required: true },
    descripcionDiagnostico: { type: String, required: true },
    medicamento: { type: String, required: true },
    nombreDeDispensario: { type: String, required: true },
    ano: { type: Number, required: true },
    rangoDeEdad: { type: String, required: true },
    provincia: { type: String, required: true },
    padresDivorciados: { type: Boolean, required: true },
    observacion: { type: String, required: true },
    fiscalia: { type: Boolean, required: true },
    embarazadas: { type: Boolean, required: true },
    nssOContrato: { type: Number, required: true },
    noAutorizacion: { type: String, required: true },
    valorReclamado: { type: Number, required: true },
    totalDeReclamaciones: { type: Number, required: true },
    revisado: { type: Boolean, required: true },
    validFact: { type: Boolean, required: true },
    objetado: { type: Boolean, required: true },
    idCentro: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Centro" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Crear el modelo basado en el esquema
const HistoriaClinica = mongoose.model('HistoriaClinica', historiaClinicaSchema);

module.exports = HistoriaClinica;
