'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesoresSchema = Schema({
    n_empleado: {type: Number, require: true, unique: true},
    nombre: {type: String, require: true},
    apellido: {type: String, rquiere: true},
    documento: {type: String, require: true},
    direccion: {type: String, require: true},
    catedra: {type: String, require: true},
    genero: {type: String, require:true},
    estado: {type: Boolean, require: true}
});

module.exports = mongoose.model('profesores', ProfesoresSchema);
