const mongoose = require('mongoose');
const dbClient = require('./dbClient')
const { Config } = require('./config')
class contenedorMongo extends dbClient {
    constructor() {
        super()
        this.connected = false
        this.client = mongoose
    }


    async connect() {
        try {
            await this.client.connect(Config.db.cnxStr + Config.db.name, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            })
            console.log('Base de datos conectada');
        } catch (error) {
            throw new Error(500, 'error al conectarse a MongoDB', error)
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            console.log('Base de datos desconectada');
            this.connected = false
        } catch (error) {
            throw new Error(500, 'error al desconectarse', error)
        }
    }

}



module.exports = { contenedorMongo };