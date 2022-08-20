const {carritoDao}= require('./carrito')
const {productoDao}= require('./productos')
const {usuarioDao}= require('./usuario')

 class eccomerceFactory{
    create(tipo){
        if(tipo=='carrito') return new carritoDao(tipo);
        if(tipo=='producto') return new productoDao(tipo);
        if(tipo=='carrito') return new  usuarioDao(tipo);
    }
 }

 module.exports ={eccomerceFactory}