 const productoDao = require('../DAOs/productos')

 const assert = require('supertest')('http://localhost:8080')
 
 const expect = require('chai').expect
 const agregado = {
   nombre: 'producto prueba',
   precio: 000000,
   id:'0000',

}
 describe('test api producto',function(){
    it('deberia devolver los productos',function(){
         const productos = productoDao.getAll();
         assert.notStrictEqual(productos.length,0);
    })
    it('eliminar el producto',function(){
      productoDao.delete('0000')
      assert.notStrictEqual(productoDao.getById('0000'),agregado);
   })

   it('deberia modificar el producto',function(){
  
      productoDao.save(agregado)

      const modificado = {
         nombre: 'producto prueba',
         precio: 000001,
         id:'0000',

      }
      productoDao.editById('0000',modificado)
    assert.stritcEqual(productoDao.getById('0000'),agregado)
   })

   })
   it('deberia agregar un producto',function(){
    
      productoDao.save(agregado)
    assert.stritcEqual(productoDao.getById('0000'),agregado)
   })

 