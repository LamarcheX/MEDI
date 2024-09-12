const { check, validationResult } = require('express-validator');
//Para Validad el email
const express = require('express');
//Express: Marco web rápido, minimalista y sin opiniones para Node.js.
const { string } = require('mathjs');
const bcrypt = require('bcrypt');
//Hashing: Utiliza un algoritmo de hashing fuerte como bcrypt o Argon2
// para almacenar las contraseñas de forma segura. Estos algoritmos convierten
// las contraseñas en cadenas de caracteres difíciles de revertir.

// Crear la aplicación Express
const app = express();

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
        return res.status(400).json({
            errors:
                errors.array()
        });
    }
    next();
};
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
//Routers
////////////////////////////////////////////////////////////////////////////////////////////////////
const Dominio = "mediapi"

// Routers
const CRUDSInfo = require(`./Datos/CRUDSInfo.js`)

const CantidadDeRuters = CRUDSInfo.length

for (let index = 1; index <= CantidadDeRuters ; index++) {
    // console.log("Index: " + index);

    let CRUDInfo = CRUDSInfo[index-1];
    // console.log(`CRUDSInfo: ${CRUDSInfo}`);
    // console.log(`CRUDInfo: ${CRUDSInfo[0].esquema}`);

    let NombreDelCRUD = CRUDInfo.nombre
    const Subdominio = NombreDelCRUD

    console.log(`/${Dominio}/${Subdominio}`);

    // Importa el router específico

    const Router = require(`./Enrutadores/Ruter${index}.js`);

    // Define la ruta base para el router de programación. Las rutas definidas en el routerProgramacion se servirán en /api/cursos/programacion
    app.use(`/${Dominio}/${Subdominio}`, Router);
}

app.get('/', (req, res) => {
    res.send("la url de medi api es http://localhost:3000/mediapi.");
});

app.get(`/${Dominio}`, (req, res) => {
    res.send("MediApi en linea.");
});

//Iniciar Servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});