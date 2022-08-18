const mongoose = require('mongoose');
const model = require('../models/producto')
const contenedor = require('../clients/contenedorMongo')
const singleton = require('singleton');

class productoDao extends contenedor{
    constructor(){
        super()
    }
    async getAll() {
        return await this.model.find()
    }

    async save(obj) {
        await this.model.create(obj);
        console.log('Mongo:Producto guardado' + obj)
    }

    async getAll() {
        return await this.model.find({});
    }
    async getById(id) {
        return await this.model.find({ _id: id }, {})
    }

    async delete(id) {

        await this.model.deleteOne({ _id: id })
        return console.log('Mongo:Producto eliminado')
    }

    async update(id, obj) {

        await this.model.updateOne({ _id: id }, {
            $set: { nombre: obj }
        })
        return console.log('Mongo:Producto actulizado')
    }
};
