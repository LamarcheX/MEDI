const Centro = require('../models/centro.model');

// Función para verificar si el centro existe
const checkCenterExists = async (req, res) => {
    const { usuario } = req.params;
    try {
        const center = await Centro.findOne({ usuario }); // Suponiendo que "usuario" es único
        if (center) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error("Error al verificar si el centro existe:", error);
        return res.status(500).json({ message: "Error al verificar el centro", error: error.message });
    }
};

const GetAllCenters = async (req, res) => {
    try {
        const centers = await Centro.find();
        res.status(201).send(centers);
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

const GetCenterByID = async (req, res) => {
    const id = req.params.id;
    try {
        const center = await Centro.findById(id);
        res.status(201).send(center);
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

const ReadCurrentCenter = async (req, res) => {
    try {
        const center = await Centro.findById(req.center._id);

        if (!center) {
            return res.status(404).send({ message: "Centro no encontrado" });
        }

        res.status(200).send(center);
    } catch (error) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            details: error.message 
        });
    }
};

const CreateACenter = async (req, res) => {
    const center = new Centro(req.body);
    
    try {
        await center.save();
        res.status(201).send(center);
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

// create an array of centers
const CreateCenters = async (req, res) => {
    try {
        const centers = await Centro.insertMany(req.body);
        res.status(201).send(centers);
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

const LoginCenter = async (req, res) => {
    console.log(req.body);
    try {
        const center = await Centro.findByCredentials(
            req.body.usuario,
            req.body.contraseña
        );

        if (!center) {
            return res.status(401).send({ error: "Login failed! Check authentication credentials" });
        }
        
        
        const token = await center.generateAuthToken();
        
        
        console.log('Token generado:', token);

        
        res.status(200).send({ center, token: token.toString() }); 
    } catch (error) {
        console.error("Error al hacer login:", error);
        res.status(500).send({ error: "Error en el servidor", message: error.message });
    }
};


const LogoutCenter = async (req, res) => {
    try {
        req.center.tokens = req.center.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.center.save();
        res.send("Logout successful");
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

const UpdateCenter = async (req, res) => {
    try {
        const centerUpdated = await Centro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!centerUpdated) {
            return res.status(404).send({ message: "Centro no encontrado" });
        }

        res.send(centerUpdated);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const DeleteAllCenters = async (req, res) => {
    try {
        await Centro.deleteMany({});
        res.status(201).send("All centers deleted");
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

const LogoutAllCenters = async (req, res) => {
    try {
        req.center.tokens = [];
        await req.center.save();
        res.send("Logout successful");
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

module.exports = {
    GetAllCenters,
    GetCenterByID,
    CreateACenter,
    CreateCenters,
    ReadCurrentCenter,
    LoginCenter,
    LogoutCenter,
    LogoutAllCenters,
    UpdateCenter,
    DeleteAllCenters,
    checkCenterExists 
};
