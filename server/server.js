require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuracion global de rotas
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, { userNewUrlParser: true, userCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    });
app.listen(process.env.PORT, () => {
    console.log("Excuchando puerto 3000");
})