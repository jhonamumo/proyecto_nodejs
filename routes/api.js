'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
var AuthController = require('../controllers/auth');
var ProfesoresController = require('../controllers/profesores');
var userProtectUrl = require('../middlewares/authUser').userProtecUrl;

//Bienvenida
api.get('/', WelcomeController.welcome);

//Alumnos
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);
api.put("/alumno/:n_lista", [
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);
api.delete("/alumno/:n_lista", AlumnosController.delete_alumno);

//Autenticacion
api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

//Profesores
api.get('/profesores', ProfesoresController.profesores);
api.get('/profesor/:n_lista', ProfesoresController.profesor);
api.post('/profesor', userProtectUrl, [
    body('n_empleado').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('documento').not().isEmpty(),
    body('direccion').not().isEmpty(),
    body('catedra').not().isEmpty(),
    body('genero').not().isEmpty(),
    body('estado').not().isEmpty()
], ProfesoresController.crear_profesor);
api.put('/profesor/:n_lista', ProfesoresController.update_profesor);
api.delete('/profesor/:n_lista', ProfesoresController.delete_profesor);

module.exports = api;
