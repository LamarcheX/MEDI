const mongoose = require("mongoose");

const citaMedicaSchema = new mongoose.Schema(
    {
        centro_nombre: {
            type: String,
            required: [true, "Por favor indique el nombre del centro para la cita"],
        },
        centro_ID: {
            type: Number,
        },
        especialista: {
            type: String,
            required: [true, "Por favor indique el nombre del Doctor para la cita"],
        },
        fecha: {
            type: Date,
            required: [true, "Por favor indique una fecha para la cita"],
        },
        hora: {
            type: String,
            required: [true, "Por favor indique una hora para la cita"],
        },
        tipo_servicio: {
            type: String,
            required: [true, "Por favor indique el tipo de servicio a solicitar de la cita"],
        },
        paciente_nombre: {
            type: String,
            required: [true, "Por favor seleccione el paciente para la cita"],
        },
        paciente_edad: {
            type: Number,
            required: [true, "Por favor indique la edad del paciente"],
        },
        paciente_nacionalidad: {
            type: String,
            required: [true, "Por favor indique la nacionalidad del paciente"],
        },
        paciente_cedula: {
            type: String,
            required: [true, "Por favor indique la cedula del paciente"],
        },
        paciente_genero: {
            type: String,
            required: [true, "Por favor indique el genero del paciente"],
        },
        paciente_direccion: {
            type: String,
            required: [true, "Por favor indique la direcciÃ³n del paciente"],
        },
        tipo_paciente: {
            type: String,
        },
        solicitante_nombre: {
            type: String,
            required: [
                true,
                "Por favor indique el nombre de quien solicita el servicio al paciente",
            ],
        },
        solicitante_apellido: {
            type: String,
            required: [
                true,
                "Por favor indique el apellido de quien solicita el servicio al paciente",
            ],
        },
        afiliacion_ars: {
            type: String,
        },
        categoria_diagnostico: {
            type: String,
            required: [true],
        },
        descripcion_diagnostico: {
            type: String,
            required: [true],
        },
        medicamento: {
            type: String,
        },
        nombre_dispensario: {
            type: String,
            required: [true],
        },
        rango_edad: {
            type: String,
        },
        provincia: {
            type: String,
        },
        padres_divorciados: {
            type: String,
        },
        observacion: {
            type: String,
        },
        fiscalia: {
            type: String,
        },
        embarazadas: {
            type: Number,
        },
        nss_o_contrato: {
            type: String,
        },
        no_autorizacion: {
            type: Number,
        },
        valor_reclamado: {
            type: Number,
        },
        total_reclamaciones: {
            type: Number,
        },
        revisado: {
            type: Number,
        },
        valid_fact: {
            type: Number,
        },
        objetado: {
            type: mongoose.Schema.Types.Decimal128,
        },
        estado: {
            type: String,
            enum: ["confirmada", "pendiente"],
            default: "pendiente",
        },
    },
    {
        timestamps: true,
    }
);

const CitaMedicaModelo = mongoose.model("CitaMedica", citaMedicaSchema);

module.exports = CitaMedicaModelo;
