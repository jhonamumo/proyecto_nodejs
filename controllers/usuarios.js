'use strict'

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const saltRounds = 10;

var Usuarios = require('../models/usuarios');

var controller = {
    crear_usuario: function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        let usuario_info = req.body;

        Usuarios.findOne({mail: usuario_info.mail}).exec((err, usuario) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(usuario) return res.status(200).json({status: 200, mensaje: 'El usuario ya existe.'});

            bcrypt.hash(usuario_info.pass, saltRounds, (err, hash) => {
                if(err) return res.status(500).json({status: 500, message: err.message});

                let usuario_model = new Usuarios();
                usuario_model.mail = usuario_info.mail;
                usuario_model.pass = hash;

                usuario_model.save( (err, usuarioStored) => {
                    if(err) return res.status(500).json({status: 500, mensaje: err});
                    if(!usuarioStored) return res.status(200).json({status: 200, mensaje: "No se logró almacenar el usuario."});

                    return res.status(200).json({
                        status: 200,
                        data: "Usuario almacenado."
                    });
                });
            });
        });
    }
}

module.exports = controller;
