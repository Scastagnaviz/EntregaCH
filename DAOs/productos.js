const mongoose = require('mongoose');
const model = require('../models/producto')
const contenedor = require('../contenedores/contenedorMongo')

class productoDao extends contenedorMongo{
    constructor(){
        super(model)
    }

}
