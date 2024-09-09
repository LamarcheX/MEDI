const { check, validationResult } = require('express-validator');
//Para Validad el email
const express = require('express');
//Express: Marco web rápido, minimalista y sin opiniones para Node.js.
const { string } = require('mathjs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Hashing: Utiliza un algoritmo de hashing fuerte como bcrypt o Argon2
// para almacenar las contraseñas de forma segura. Estos algoritmos convierten
// las contraseñas en cadenas de caracteres difíciles de revertir.

////////////////////////////////////////////////////////////////////////////////////////////////////
// Conectar a MongoDB (reemplaza con tu URI de conexión)
mongoose.connect('mongodb://localhost/mediapi', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD
////////////////////////////////////////////////////////////////////////////////////////////////////

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // no token provided

    jwt.verify(token, 'tu_secreto_muy_seguro', (err, user) => {
        if (err) return res.sendStatus(403); // forbidden
        req.user = user;
        next();
    });
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(401).json('Unauthorized');
        }
        next();
    };
};

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors:   
 errors.array() });
    }
    next();
};

const CRUDSInfo = [//Nombres, Esquema de datos
    {
        nombre: "usuarios", esquema: {
            [`id`]: String, // Identificador único del usuario.
            [`nombre`]: String, // Nombre completo del usuario.
            [`email`]: String, // Correo electrónico del usuario.
            [`contraseña`]: {
                type: String,
                required: true
            }, // Contraseña del usuario (al guardarse se encriptara automaticamente).
            ["rol"]: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            }, //Rol del usuario (médico, administrador, paciente).
            [`fecha_creacion`]: Date, // Fecha de creación del usuario en el sistema.
            [`ultima_sesion`]: Date, // Última vez que el usuario accedió al sistema.
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

    {
        nombre: "pacientes", esquema: {
            [`_id`]: String, //- Identificador único del paciente.
            [`nombre`]: String, // Nombre completo del paciente.
            [`fecha_nacimiento`]: Date, // Fecha de nacimiento del paciente.
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

    {
        nombre: "citas", esquema: {
            [`_id`]: String, // Identificador único de la cita.
            [`paciente_id`]: String, // Referencia al paciente.
            [`medico_id`]: String, // Referencia al médico.
            [`fecha`]: Date, // Fecha de la cita.
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

    {
        nombre: "registrosmedicos", esquema: {
            [`_id`]: String, //  Identificador único de la historia clínica.
            [`paciente_id`]: String, //  Referencia al paciente.
            [`consultas`]: Array, //  Lista de consultas realizadas (fecha, médico, notas).
            [`diagnosticos`]: Array, //  Lista de diagnósticos médicos.
            [`tratamientos`]: Array, //  Tratamientos prescritos para los diagnósticos.
            [`recetas`]: Array, //  Referencias a las recetas electrónicas emitidas.
            [`documentos`]: Array, //  Archivos adjuntos (imágenes, resultados de pruebas, etc.).
            [`ultima_actualizacion`]: Date, //  Fecha de la última actualización de la historia clínica.
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
            [`fecha_emision`]: Date, // Fecha en que se emitió la receta.
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

    {
        nombre: "facturas", esquema: {
            [`_id`]: String, // Identificador único de la factura.
            [`paciente_id`]: String, // Referencia al paciente.
            [`servicios`]: Array, // Lista de servicios médicos facturados.
            [`servicio`]: String, // Nombre del servicio.
            [`costo`]: Number, // Costo de cada servicio.
            [`total`]: Number, // Total de la factura.
            [`fecha_emision`]: Date, // Fecha en que se generó la factura.
            [`fecha_pago`]: Date, // Fecha en que se realizó el pago.
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

    {
        nombre: "inventario", esquema: {
            [`_id`]: String, //Identificador único del producto en inventario.
            [`producto`]: String, //Nombre del producto médico.
            [`categoria`]: String, //Categoría del producto (ej. medicamentos, insumos).
            [`cantidad`]: Number, //Cantidad disponible en stock.
            [`umbral`]: Number, //Umbral mínimo para alerta de reabastecimiento.
            [`proveedor`]: String, //Proveedor del producto.
            [`fecha_reabastecimiento`]: Date, //Fecha en que se reabasteció el producto.
            [`caducidad`]: Date, //Fecha de vencimiento del producto (si aplica).
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

    {
        nombre: "reportes", esquema: {
            [`_id`]: String, // Identificador único del reporte.
            [`tipo`]: String, // Tipo de reporte (ej. citas, facturación, inventario).
            [`contenido`]: String, // Detalles del reporte (ej. resumen, datos generados).
            [`fecha_generacion`]: Date, // Fecha en la que se generó el reporte.
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
const Dominio = "mediapi"

function CrearCRUD(CRUDInfo) {
    let NombreDelCRUD = CRUDInfo.nombre

    // Define los modelos Mongoose que representarán tus colecciones de MongoDB.
    // Por ejemplo, para el modelo Datos:

    const EsquemaDeDatos = new mongoose.Schema({ name: String, pepe: String });

    const collectionDeDatos = mongoose.model(NombreDelCRUD, EsquemaDeDatos);

    const Subdominio = NombreDelCRUD

    //crear un dato nuevo :
    app.post(`/${Dominio}/${Subdominio}`, verifyToken, authorize, handleValidationErrors(CRUDInfo.post.rol), async (req, res) => {
        try {
            if (NombreDelCRUD == "usuarios") {
                const { nombre, email, password, ...rest } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);//Encripta la contraseña
                // // Al verificar una contraseña utiliza para desencriptar:
                // const isMatch = await bcrypt.compare(password, user.password);

                const user = await collectionDeDatos.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: 'Credenciales inválidas' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Credenciales inválidas' });
                }

                // Generar un token JWT (implementación de JWT no incluida en este ejemplo)
                const token = jwt.sign({ userId: user._id }, 'tu_secreto_muy_seguro', { expiresIn: '1h' });


                const nuevoUsuario = new collectionDeDatos({
                    nombre,
                    email,
                    password: hashedPassword,
                    ...rest
                });

                await nuevoUsuario.save();
                res.status(201).json(nuevoUsuario);
            } else {
                const NuevosDatos = new collectionDeDatos(req.body);
                await NuevosDatos.save();
                res.status(201).json(NuevosDatos);
            }

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al crear el paciente' });
        }
    });

    // Obtener un dato por ID
    app.get(`/${Dominio}/${Subdominio}/:id`, verifyToken, authorize, handleValidationErrors(CRUDInfo.GetInfo.rol), async (req, res) => {
        try {
            const Datos = await collectionDeDatos.findById(req.params.id);

            if (!Datos) {
                return res.status(404).json({ message: 'Datos no encontrado' });
            }

            res.json(Datos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el paciente' });
        }
    });

    //Para obtener todos los datos
    app.get(`/${Dominio}/${Subdominio}`, verifyToken, authorize, handleValidationErrors(CRUDInfo.GetInfo.rol), async (req, res) => {
        try {
            const TodosLosDatos = await collectionDeDatos.find();
            res.json(TodosLosDatos);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message:
                    'Error al obtener pacientes'
            });
        }
    });

    // Operación PUT (Actualizar)
    // Para actualizar un documento en MongoDB, utilizaremos el método updateOne() 
    // de Mongoose. Este método nos permite buscar un documento por su ID y actualizar
    //  los campos especificados.

    app.put(`/${Dominio}/${Subdominio}/:id`, verifyToken, authorize, handleValidationErrors(CRUDInfo.PutInfo.rol), async (req, res) => {
        try {
            
            const updatedPaciente = await collectionDeDatos.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedPaciente) {
                return res.status(404).json({ message: 'Datos no encontrado' });
            }
            res.json(updatedPaciente);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al actualizar el paciente' });
        }
    });

    //Para eliminar un documento en MongoDB, utilizaremos el método deleteOne() de Mongoose.
    app.delete(`/${Dominio}/${Subdominio}/:id`, verifyToken, authorize ,handleValidationErrors(CRUDInfo.DeleteInfo.rol), async (req, res) => {
        try {
            await collectionDeDatos.findByIdAndDelete(req.params.id);
            res.json({ message: 'Datos eliminado correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al eliminar el paciente' });
        }
    });
}

app.get('/', (req, res) => {
    res.send("la url de medi api es http://localhost:3000/mediapi.");
});

app.get(`/${Dominio}`, (req, res) => {
    res.send("MediApi en linea.");
});

for (let i = 1; i < CRUDSInfo.length; i++) {
    CrearCRUD(CRUDSInfo[i])
}