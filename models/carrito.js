const mongoose = require('mongoose');
const carritoSchema = new mongoose.Schema({
    nombre :{type:String, required:true, max:100},
    fecha:{type:Date,required:true},
    productos:{type:Array, required:true}

})

module.exports= mongoose.model('carritos',carritoSchema)