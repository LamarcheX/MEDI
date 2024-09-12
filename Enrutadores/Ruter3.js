let NumeroDeEnrutador = 3

const express = require('express');
//Express: Marco web rápido, minimalista y sin opiniones para Node.js.

////////////////////////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');

// Conectar a MongoDB (reemplaza con tu URI de conexión)
mongoose.connect('mongodb://localhost/mediapi', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));
////////////////////////////////////////////////////////////////////////////////////////////////////

const CRUDSInfo = require(`../Datos/CRUDSInfo`);
let CRUDInfo = CRUDSInfo[NumeroDeEnrutador-1];
let NombreDelCRUD = CRUDInfo.nombre

// Define los modelos Mongoose que representarán tus colecciones de MongoDB.
// Por ejemplo, para el modelo Datos:

const EsquemaDeDatos = new mongoose.Schema(CRUDInfo.esquema);

const collectionDeDatos = mongoose.model(NombreDelCRUD, EsquemaDeDatos);

const NuevoRouter = express.Router();

//Para obtener todos los datos
NuevoRouter.get(`/`, async (req, res) => {
    try {
        const TodosLosDatos = await collectionDeDatos.find();
        // res.json(TodosLosDatos);
        res.json(TodosLosDatos);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message:
                'Error al obtener pacientes'
        });
    }
});

// Obtener un dato por ID
NuevoRouter.get(`/:id`, async (req, res) => {
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

//crear un dato nuevo :
NuevoRouter.post(`/`, async (req, res) => {
    try {
        const NuevosDatos = new collectionDeDatos(req.body);
        await NuevosDatos.save();
        res.status(201).json(NuevosDatos);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear el paciente' });
    }
});

// Operación PUT (Actualizar)
// Para actualizar un documento en MongoDB, utilizaremos el método updateOne() 
// de Mongoose. Este método nos permite buscar un documento por su ID y actualizar
//  los campos especificados.

NuevoRouter.put(`/:id`, async (req, res) => {
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
NuevoRouter.delete(`/:id`, async (req, res) => {
    try {
        await collectionDeDatos.findByIdAndDelete(req.params.id);
        res.json({ message: 'Datos eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar el paciente' });
    }
});

module.exports = NuevoRouter;