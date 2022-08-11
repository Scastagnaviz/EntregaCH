const express = require("express");

const handlebars = require("express-handlebars");
const routes = require("./src/routes/routes");

const cluster = require("cluster");
const { fork } = require('child_process');

const { isValidObjectId, connect } = require("mongoose");
const mongoose = require("mongoose");

const { validatePass } = require("./src/utils/passValidator");
const { createHash } = require("./src/utils/hashGenerator");
const UserModel = require("./src/models/usuarios");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const dotenv = require('dotenv')
dotenv.config();
const parseArgs = require('minimist');
const compression = require('compression');



const app = express();
app.use(compression());


app.use(
    session({
        secret: 'san',
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: parseInt(TIEMPO_EXPIRACION),
        },
        rolling: true,
        resave: true,
        saveUninitialized: true,
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "/src/views/partials/",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);

app.set("view engine", "hbs");
app.set("views", "./src/views");
app.use(express.static(__dirname + "/public"));

passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("User not found with username" + username);
                return done(null, false);
            }
            if (!validatePass(user, password)) {
                console.log("invalid password");
                return done, false;
            }

            return done(null, user);
        });
    })
);

passport.use(
    "signup",
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log("Error de signup" + err);
                return done(err);
            }
            if (user) {
                console.log("Usuario ya existente");
                return done(null, false);
            }
            console.log(req.body);

            const newUser = {
                username: username,
                password: createHash(password),
            };
            console.log(newUser);

            UserModel.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log("Error in Saving user: " + err);
                    return done(err);
                }
                console.log(userWithId);
                console.log("Registro Existoso");
                return done(null, userWithId);
            });
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, done);
});


const options = { default: { puerto: "8080", modo: "FORK" }, alias: { m: 'modo', p: 'puerto', _: 'otros' } }
const args = parseArgs(process.argv.slice(2), options);
const PORT = args.puerto || 8080;


if (args.modo === 'FORK') {
    const server = app.listen(PORT, () => {
        console.log("Server on port " + PORT + ' modo ' + args.modo);
    });

    server.on("error", (error) => console.log("Error en el servidor"+error));
} else if (args.modo === 'CLUSTER') {
    if (cluster.isMaster) {
        console.log('PID Master ' + process.pid);
        for (let index = 0; index < numCPUs; index++) {
            cluster.fork();

        }
        cluster.on('exit', worker => {
            console.log('PID Worker died');
        })
    }
    else {
        let server = app.listen(PORT, (req, res) => {
            console.log("Server on port " + PORT + ' cluster ');
            //  console.log(cluster.process.id);

        });
    }
}