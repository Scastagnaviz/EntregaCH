//const {carritoDao} = require('../DAOs/carrito')
//const {productoDao} = require('../DAOs/productos')
//const carrito = new carritoDao();
//const producto = new productoDao();

/// Esto lo mando a services??//
const nodemailer = require('nodemailer')

///Mail

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'sienna.purdy@ethereal.email',
        pass: 'jmvVRa4zKGAuzNgnyZ'
    }
});



async function sendMail(obj){
    const mail = {
        from: 'Servidor de eccomerce node.js'+obj,
        to:TEST_MAIL,
        subject: 'Nuevo usuario',
        html:'<h3 style="color: blue"> Mail test desde node</h3>',
    
    }
try {
    const info = await transporter.sendMail(mail)
    console.log(info);
} catch (error) {
    console.log(error);
}
}

////////////whatsapp
const twilio = require('twilio');
const accountSid = 'AC80e7be066f54540f05a1e56fa44c69b6';
const authToken = 'd0c12bf57637596411040ae2e23c7157';

const client = twilio(accountSid, authToken)

const msj={
    body: 'mensajes desde node',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5493416721758'
}


async function sendWhatsApp(obj){
    const msj={
        body: 'mensajes desde node '+ obj,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5493416721758',
    }
    try {
        await client.messages.create(msj)
        console.log('Created message');
    } catch (error) {
        console.log(error);
    }

}
///////
const log4js = require("log4js");
log4js.configure({
    appenders: {
        console: { type: "console" },
        logs: { type: "file", filename: "logs.log" },
        warn: { type: "file", filename: "warn.log" },
        error: { type: "file", filename: "error.log" },
    },
    categories: {
        default: { appenders: ["console"], level: "trace" },
        consola: { appenders: ["logs"], level: "debug" },
        warn: { appenders: ["warn"], level: "warn" },
        error: { appenders: ["error"], level: "error" },
        todos: {
            appenders: ["logs", "console"],
            level: ["ALL"],
        },
    },
});

const logger = log4js.getLogger("todos");
const warnLogger = log4js.getLogger("warn");
const errorLogger = log4js.getLogger("error");



function getRoot(req, res) {
    logger.info('Ingreso a /')
    if (req.isAuthenticated()) {
        res.redirect('profile')
    }
    else {
        res.render('main')
    }

}

function getLogin(req, res) {
    logger.info('Ingreso a /login')
    if (req.isAuthenticated()) {
        res.redirect('profile')
    }
    else {
        res.render('login');
    }
}

function getSignup(req, res) {
    logger.info('Ingreso a /signup')
    res.render('signup')

}

function postLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    }
    else {
        res.render('login');
    }
}

function postSignup(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    }
    else {
        res.render('login');
    }
}

function getProfile(req, res) {
    logger.info('Ingreso a /profile')
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('profileUser', { user: user, isUser: true })
    } else {
        res.redirect('login')
    }
}

function getFailLogin(req, res) {
    errorLogger.error('Ingreso a /failLogin')
    res.render('login-error', {})
}


function getFailSignup(req, res) {
    errorLogger.error('Ingreso a /failSignup')
    res.render('signup-error', {})
}

function getLogout(req, res) {
    logger.info('Ingreso a /logout')
    req.logout((err) => {
        if (!err) {
            res.render('main')
        }
    });
}

function failRoute(req, res) {
    warnLogger.warn('Ingreso a ruta no existente')
    res.status(404).render('routing-error', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

function getTwitterPage(req, res) {
    res.render('twitterPage');
}

function getInfo(req, res) {
    logger.info('Ingreso a /info')
    const args = parseArgs(process.argv.slice(2))
    const exec = process.execPath;
    const os = process.platform;
    const rss = process.memoryUsage().rss;
    const version = process.version
    const dir = process.cwd();
    const pid = process.pid;

    const datos = {
        args: args,
        os: os,
        node: version,
        rss: rss,
        path: exec,
        Id_Proceso: pid,
        carpeta: dir,
        cpu: numCPUs
    }
    res.render('info', { datos: datos });
}



async function getCarrito(req, res) {
    let carritoLista = await carrito.getAll();

    res.render('carrito',{carrito :carritoLista});
}

async function getProductos(req, res){
    let lista= await producto.getAll()

   res.render('productos',{productos:lista,listExists:true});
}

async function addProductoCarrito(req, res){
    let id= req.params.id; 
            carrito.AddProdCarrito(id,obj)
            window.alert('Producto agregado')
            res.redirect("/productos");}
    


     async function envio(req, res){
        sendWhatsApp(obj)
        sendMail(obj);
        window.alert('pedido realido con exito!');
        res.redirect("/profile");
     }       

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFailLogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailSignup,
    checkAuthentication,
    getProfile,
    getTwitterPage,
    getInfo,
    getProductos,
    getCarrito,
    addProductoCarrito,
    envio
}
