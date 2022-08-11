const mongoose = require('mongoose');
const model = require('../models/carrito')
const contenedor = require('../contenedores/contenedorMongo')

class carritoDao extends contenedorMongo{
    constructor(model){
        super(model)
    }
    async addProductoCarrito(id2,obj){
        let carrito = await this.model.find({_id:id2})
        carrito.productos.push(obj)
        return console.log('Mongo:producto agregado')

    }
}