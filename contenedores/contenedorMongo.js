const mongoose = require('mongoose');

class contenedorMongo {
    constructor(modelo) {
        mongoose.connect('mongodb+srv://SantiagoC:1628@cluster0.nnzkxji.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos MongoDB conectada');
        this.model=  mongoose.model(modelo);
    }

    async getAll() {
        return await this.model.find()
    }

    async save(obj){
        await this.model.create(obj);
        console.log('Mongo:Producto guardado'+ obj)
    }
    
    async getAll(){
            return await this.model.find({}); 
    }
    async  getById(id){
        return await this.model.find({_id:id},{})
    }
    
    async  delete(id){
        
            await this.model.deleteOne({_id:id})
            return console.log('Mongo:Producto eliminado')
    }
    
    async update(id,obj){
        
        await this.model.updateOne({_id:id},{
            $set :{nombre:obj}
        }) 
        return console.log('Mongo:Producto actulizado') 
    }
};





module.exports = { contenedorMongo };