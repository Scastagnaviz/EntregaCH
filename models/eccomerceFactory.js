const carrito= require('./carrito')
const producto= require('./producto')
const usuario= require('./usuario')

 class eccomerceFactory{
    create(tipo){
        if(tipo=='carrito') return new carrito(tipo);
        if(tipo=='producto') return new producto(tipo);
        if(tipo=='carrito') return new  usuario(tipo);
    }
 }

 module.exports ={eccomerceFactory}