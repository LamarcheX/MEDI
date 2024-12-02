const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const centroSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
    },
    contraseña: {
        type: String,
        required: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role: {
        type: String,
        required: false,
    },
});

centroSchema.virtual("hidtoria-clinica", {
    ref: "HistoriaClinica",
    localField: "_id",
    foreignField: "centro",
});

centroSchema.methods.toJSON = function () {
    const center = this;
    const centerObject = center.toObject();

    delete centerObject.tokens;

    return centerObject;
};

const jwtSecret = process.env.JWT_SECRET;

centroSchema.methods.generateAuthToken = async function () {
    const center = this
    try {
        const token = jwt.sign({ _id: center._id.toString() }, jwtSecret)
        
        center.tokens = center.tokens.concat({ token })
        await center.save()
        
        return token
    } catch (error) {
        return ('Error:', error);
    }
};

centroSchema.statics.findByCredentials = async (usuario, contraseña) => {
    const center = await Centro.findOne({ usuario, contraseña });

    if (!center) {
        throw new Error("Unable to login");
    }

    return center;
};

const Centro = mongoose.model("Centro", centroSchema);

module.exports = Centro;
