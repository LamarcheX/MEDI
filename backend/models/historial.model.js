const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historiaClinicaSchema = new Schema({
    fecha: { type: Date, required: true, default: Date.now },
    mes: { type: String, required: true },
    especialista: { type: String, required: true },
    tipoDeServicio: { type: String, required: true },
    nombrePaciente: { type: String, required: true },
    edad: { type: Number, required: true },
    nacionalidad: { type: String, required: true },
    noCedula: { type: String, required: true },
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
    rangoDeEdad: { type: String, required: false },
    provincia: { type: String, required: true },
    padresDivorciados: { type: Boolean, required: true },
    observacion: { type: String, required: true },
    fiscalia: { type: Boolean, default: false },
    embarazadas: { type: Boolean, required: true },
    nssOContrato: { type: String, required: true },
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

historiaClinicaSchema.pre('save', function (next) {
    // Check if rangoDeEdad is empty or not set
    if (!this.rangoDeEdad) {
        const ageRanges = [
            { min: 0, max: 12, range: '0-12' },
            { min: 13, max: 19, range: '13-19' },
            { min: 20, max: 29, range: '20-29' },
            { min: 30, max: 39, range: '30-39' },
            { min: 40, max: 49, range: '40-49' },
            { min: 50, max: 59, range: '50-59' },
            { min: 60, max: 100, range: '60+' }
        ];

        // Find the appropriate age range
        const matchedRange = ageRanges.find(r => this.edad >= r.min && this.edad <= r.max);

        // Set rangoDeEdad, defaulting to 'Desconocido' if no match
        this.rangoDeEdad = matchedRange ? matchedRange.range : 'Desconocido';
    }

    next();
});

// Crear el modelo basado en el esquema
const HistoriaClinica = mongoose.model('HistoriaClinica', historiaClinicaSchema);

module.exports = HistoriaClinica;
