const mongoose = require('mongoose');
const model = require('../models/usuario')
const contenedor = require('../contenedores/contenedorMongo')

class usuarioDao extends contenedorMongo{
    constructor(){
        super(model)
    }

}
