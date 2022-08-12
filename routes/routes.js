const controller = require('../controllers/controlador')
const express = require("express");
const log4js = require("log4js");
const passport = require("passport");
const app = express();
const {Router} = express;

const routerP= Router();
const routerC= Router();

app.use('/productos', routerP);
app.use('/carrito', routerC);

app.get("/", controller.getRoot);

app.get("/login",controller.getLogin,);
app.post("/login",passport.authenticate("login", { failureRedirect: "/faillogin" }),controller.postLogin);
app.get("/faillogin", controller.getFailLogin);


app.get('/signup', controller.getSignup);
app.post('/signup', passport.authenticate('signup',  { failureRedirect: "/failsignup" }), controller.postSignup);
app.get('/failsignup', controller.getFailSignup);

app.get("/logout", controller.getLogout);

app.get("/profile", controller.getProfile);

app.get("/ruta-protegida", controller.checkAuthentication, (req, res) => {res.render("protected");});

app.get("/info",controller.getInfo);


app.get("/envio",controller.envio)




//////////////////////


routerP.get('/', controller.getProductos);
routerC.get('/', controller.getCarrito);
routerP.get('/addTocarrito',controller.addProductoCarrito);

app.get("*", controller.failRoute);