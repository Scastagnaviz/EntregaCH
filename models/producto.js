const mongoose = require('mongoose');
const eccomerce = require('./eccomerce');
const productoSchema = new mongoose.Schema({
    nombre: { type: String,/*/required:true, max:100/*/ },
    descripcion: { type: String,/*/required:true, max:100/*/ },
    codigo: { type: Number/*/,required:true/*/ },
    precio: { type: Number/*/,required:true/*/ },
    stock: { type: Number/*/,required:true/*/ },
    url: { type: String/*/,required:true,max:100/*/ },
})


class producto extends eccomerce() {
    constructor(tipo) {
        this.tipo = 'producto'
    }
}

const model = mongoose.model('productos', productoSchema)
module.exports = { model, producto }