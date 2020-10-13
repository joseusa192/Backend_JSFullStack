if (process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require('path');

//Inicializacion
const app = express();
require('./databese')

// Configuraciones
app.set('port', process.env.PORT || 3000);

//Midelwares
app.use(morgan('dev'));
const almacenar = multer.diskStorage({
    destination: path.join(__dirname, 'Public/uploads'),
    filename(req,file,cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer(almacenar).single('image'));
app.use(express.urlencoded({extends:false}));
app.use(express.json());

//Rutas
app.use('/api/Books', require("./routes/Books"));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'Public')));

//Iniciar Servidor
app.listen(app.get('port'),() =>{
    console.log("Servidor en puerto", app.get('port'));
})

