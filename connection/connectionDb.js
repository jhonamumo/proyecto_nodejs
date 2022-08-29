'use strict'
const mongoose = require('mongoose');

const url = 'mongodb+srv://root:root@cluster0.vdj8car.mongodb.net/curso?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Conexión a la Base de datos Exitosa.');
    })
    .catch(err => console.log(err));

module.exports = mongoose;