const productoDao = require('../DAOs/productos')

const request = require('supertest')('http://localhost:8080')

const expect = require('chai').expect
const agregado = {
   nombre: 'producto prueba',
   precio: 000000,
   id: '0000',

}
describe('test api producto', () => {
   describe('GET', () => {
      it('deberia devolver los productos', async () => {
         await request.get('/productos')
         //const productos = productoDao.getAll();
         expect(productos.length).to.eql(0)
         //assert.notStrictEqual(productos.length,0);
      })
   })
})
describe('DEL', () => {
   it('eliminar el producto',  async () => {
      await request.delete('/product')
      // productoDao.delete('0000')
      expect(productoDao.getById('0000')).not.to.be(agregado)
      //assert.notStrictEqual(productoDao.getById('0000'),agregado);
   })

   it('deberia modificar el producto', function () {

            const modificado = {
         nombre: 'producto prueba',
         precio: 000001,
         id: '0000',

      }
      productoDao.editById('0000', modificado)
      expect(productoDao.getById('0000')).to.eql(modificado)
      //assert.stritcEqual(productoDao.getById('0000'), agregado)
   })

})
it('deberia agregar un producto', function () {

   productoDao.save(agregado)
   expect(productoDao.getById('0000')).to.eql(agregado)
   assert.stritcEqual(productoDao.getById('0000'), agregado)
})

