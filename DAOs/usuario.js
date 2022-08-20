const mongoose = require('mongoose');
const model = require('../models/usuario')
//const contenedorMongo = require('../clients/contenedorMongo')
const eccomerce = require('./eccomerce')

class usuarioDao extends eccomerce{
    constructor(){
        super()
        this.tipo = 'usuario'
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
    static instance(){
        if(!instance){
        instance = new carritoDao();
    }
    return instance
}

}

module.exports = {  usuarioDao}
