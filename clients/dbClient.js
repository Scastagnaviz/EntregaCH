class dbClient {
    constructor(){
        
    }
    async connect() {
        throw new Error('Falta implementar subclase')
    }

    async disconnect() {
        throw new Error('Falta implementar subclase')
    }
}

module.exports = {dbClient}

