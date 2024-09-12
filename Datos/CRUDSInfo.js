const CRUDSInfo = [//Nombres, Esquema de datos
    //R1
    {
        nombre: "usuarios", esquema: {
            [`_id`]: String, // Identificador único del usuario.
            [`nombre`]: String, // Nombre completo del usuario.
            [`email`]: String, // Correo electrónico del usuario.
            [`contraseña`]: {
                type: String,
                required: false
            }, // Contraseña del usuario (al guardarse se encriptara automaticamente).
            ["rol"]: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            }, //Rol del usuario (médico, administrador, paciente).
            [`fecha_creacion`]: String, // Fecha de creación del usuario en el sistema.
            [`ultima_sesion`]: String, // Última vez que el usuario accedió al sistema.
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Almacena información de todos los usuarios (médicos, pacientes, administradores).

    //R2
    {
        nombre: "pacientes", esquema: {
            [`_id`]: String, //- Identificador único del paciente.
            [`nombre`]: String, // Nombre completo del paciente.
            [`fecha_nacimiento`]: String, // Fecha de nacimiento del paciente.
            [`direccion`]: String, // Dirección del paciente.
            [`telefono`]: String, // Número de teléfono del paciente.
            [`email`]: String, // Correo electrónico del paciente.
            [`historia_clinica`]: Array, // Referencias a los registros de historias clínicas.
            [`contacto_emergencia`]: String, // Contacto en caso de emergencia.
            [`alergias`]: Array, // Lista de alergias conocidas del paciente.
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Contiene datos específicos de los pacientes, como historial clínico, alergias, etc.

    //R3
    {
        nombre: "citas", esquema: {
            [`_id`]: String, // Identificador único de la cita.
            [`paciente_id`]: String, // Referencia al paciente.
            [`medico_id`]: String, // Referencia al médico.
            [`fecha`]: String, // Fecha de la cita.
            [`hora`]: String, // Hora de la cita.
            [`motivo`]: String, // Razón de la consulta.
            [`estado`]: String, // Estado de la cita (confirmada, cancelada, pendiente).
            [`notificaciones`]: Boolean, // Indica si las notificaciones fueron enviadas al paciente.
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Guarda información de las citas programadas.

    //R4
    {
        nombre: "registrosmedicos", esquema: {
            [`_id`]: String, //  Identificador único de la historia clínica.
            [`paciente_id`]: String, //  Referencia al paciente.
            [`consultas`]: Array, //  Lista de consultas realizadas (fecha, médico, notas).
            [`diagnosticos`]: Array, //  Lista de diagnósticos médicos.
            [`tratamientos`]: Array, //  Tratamientos prescritos para los diagnósticos.
            [`recetas`]: Array, //  Referencias a las recetas electrónicas emitidas.
            [`documentos`]: Array, //  Archivos adjuntos (imágenes, resultados de pruebas, etc.).
            [`ultima_actualizacion`]: String, //  Fecha de la última actualización de la historia clínica.
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Almacena los registros detallados de las historias clínicas.

    //R5
    {
        nombre: "prescripciones", esquema: {
            [`_id`]: String, // Identificador único de la receta.
            [`paciente_id`]: String, // Referencia al paciente.
            [`medico_id`]: String, // Referencia al médico que emitió la receta.
            [`medicamentos`]: Array, // Lista de medicamentos prescritos.
            [`nombre_medicamento`]: String, // Nombre del medicamento.
            [`dosis`]: String, // Dosis prescrita.
            [`frecuencia`]: String, // Frecuencia de la toma (ej. cada 8 horas).
            [`duracion`]: String, // Duración del tratamiento (ej. 7 días).
            [`fecha_emision`]: String, // Fecha en que se emitió la receta.
            [`estado`]: String, // Estado de la receta (activa, finalizada).
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Contiene información sobre las recetas electrónicas.

    //R6
    {
        nombre: "facturas", esquema: {
            [`_id`]: String, // Identificador único de la factura.
            [`paciente_id`]: String, // Referencia al paciente.
            [`servicios`]: Array, // Lista de servicios médicos facturados.
            [`servicio`]: String, // Nombre del servicio.
            [`costo`]: Number, // Costo de cada servicio.
            [`total`]: Number, // Total de la factura.
            [`fecha_emision`]: String, // Fecha en que se generó la factura.
            [`fecha_pago`]: String, // Fecha en que se realizó el pago.
            [`metodo_pago`]: String, // Método de pago (tarjeta, transferencia).
            [`estado`]: String, // Estado de la factura (pagada, pendiente, cancelada).
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Guarda los datos de las facturas generadas.

    //R7
    {
        nombre: "inventario", esquema: {
            [`_id`]: String, //Identificador único del producto en inventario.
            [`producto`]: String, //Nombre del producto médico.
            [`categoria`]: String, //Categoría del producto (ej. medicamentos, insumos).
            [`cantidad`]: Number, //Cantidad disponible en stock.
            [`umbral`]: Number, //Umbral mínimo para alerta de reabastecimiento.
            [`proveedor`]: String, //Proveedor del producto.
            [`fecha_reabastecimiento`]: String, //Fecha en que se reabasteció el producto.
            [`caducidad`]: String, //Fecha de vencimiento del producto (si aplica).
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Almacena información sobre los productos médicos en inventario..
    
    //R8
    {
        nombre: "reportes", esquema: {
            [`_id`]: String, // Identificador único del reporte.
            [`tipo`]: String, // Tipo de reporte (ej. citas, facturación, inventario).
            [`contenido`]: String, // Detalles del reporte (ej. resumen, datos generados).
            [`fecha_generacion`]: String, // Fecha en la que se generó el reporte.
            [`usuario_generador`]: String, // Referencia al usuario que generó el reporte (médico o administrador).
        },

        GetInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PostInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        PutInfo: {
            RequiereRol: [
                "admin",
            ],
        },

        DeleteInfo: {
            RequiereRol: [
                "admin",
            ],
        },
    },
    //Guarda los reportes generados por el sistema..
]

module.exports = CRUDSInfo