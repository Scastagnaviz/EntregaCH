const mongoose = require('mongoose');
const usuariosSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    edad: { type: String, required: true, max: 100 },
    direccion: { type:Number, required: true, max: 100 },
    telefono: { type:Number, required: true, max: 100 },
    avatar: { type: String, required: true, max: 100 },

})

module.exports= mongoose.model('usuarios',usuariosSchema)