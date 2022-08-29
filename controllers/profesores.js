'use strict'

const { validationResult } = require('express-validator');

var Profesores = require('../models/profesores');

var controller = {
    profesores: function(req, res){
        Profesores.find({}).exec((err, profesores) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!profesores.length) return res.status(200).json({status: 200, mensaje: 'No hay profesores por listar.'});
            return res.status(200).json({
                status: 200,
                data: profesores
            });
        });
    },

    profesor: function(req, res){
        let n_lista = req.params.n_lista;
        Profesores.findOne({n_empleado: n_lista}).exec((err, profesor) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!profesor) return res.status(200).json({status: 200, mensaje: 'No se encontró el Profesor.'});
            return res.status(200).json({
                status: 200,
                data: profesor
            });
        });
    },

    crear_profesor: function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        let prof_info = req.body;

        Profesores.findOne({n_empleado: prof_info.n_empleado}).exec((err, profesor) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(profesor) return res.status(200).json({status: 200, mensaje: 'El numero de empleado ya existe.'});

            let profe_model = new Profesores();
            profe_model.n_empleado = prof_info.n_empleado;
            profe_model.nombre = prof_info.nombre;
            profe_model.apellido = prof_info.apellido;
            profe_model.documento = prof_info.documento;
            profe_model.direccion = prof_info.direccion;
            profe_model.catedra = prof_info.catedra;
            profe_model.genero = prof_info.genero;
            profe_model.estado = prof_info.estado;

            profe_model.save( (err, profesorStored) => {
                if(err) return res.status(500).json({status: 500, mensaje: err});
                if(!profesorStored) return res.status(200).json({status: 200, mensaje: "No se logró almacenar el profesor."});

                return res.status(200).json({
                    status: 200,
                    data: "Profesor almacenado."
                });
            });
        });
    },

    update_profesor: function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        let n_lista = req.params.n_lista;
        let profe_info = req.body;

        let profe_info_update = {
            nombre: profe_info.nombre,
            apellido: profe_info.apellido,
            documento: profe_info.documento,
            direccion: profe_info.direccion,
            catedra: profe_info.catedra,
            genero: profe_info.genero,
            estado: profe_info.estado
        };

        Profesores.findOneAndUpdate({n_empleado: n_lista}, profe_info_update, {new:true}, (err, profesorUpdate) => {
            if(err) return res.status(500).json({mensaje: "Error al actualizar."});
            if(!profesorUpdate) return res.status(404).json({message: "No existe el profesor."});

            return res.status(200).json({
                nombre: profesorUpdate.nombre,
                apellido: profesorUpdate.apellido,
                documento: profesorUpdate.documento,
                direccion: profesorUpdate.direccion,
                catedra: profesorUpdate.catedra,
                genero: profesorUpdate.genero,
                estado: profesorUpdate.estado
            });

        });
    },

    delete_profesor: function(req, res){
        let n_lista = req.params.n_lista;

        Profesores.findOneAndRemove({n_empleado: n_lista}, (err, profesorDelete) => {
            if(err) return res.status(500).json({mensaje: "Error al eliminar."});
            if(!profesorDelete) return res.status(404).json({message: "No existe el profesor."});

            return res.status(200).json({
                message: "Profesor eliminado.",

            });
        });
    }
}

module.exports = controller;
