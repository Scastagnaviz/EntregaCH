const mongoose = require('mongoose');
const eccomerce = require('../DAOs/eccomerce');

const carritoSchema = new mongoose.Schema({
    nombre :{type:String, required:true, max:100},
    fecha:{type:Date,required:true},
    productos:{type:Array, required:true}

})
const model=mongoose.model('carritos',carritoSchema)


class carrito extends eccomerce(){
constructor(tipo){
    this.tipo = 'carrito'
}
}

module.exports= {model,carrito}