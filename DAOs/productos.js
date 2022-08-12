const mongoose = require('mongoose');
const model = require('../models/producto')
const contenedor = require('../contenedores/contenedorMongo')

class productoDao extends contenedor{
    constructor(){
        super(model)
    }

}
