'use strict'

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {
    login: function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        
        let login_info = req.body;
        
        Usuarios.findOne({mail: login_info.mail}).exec((err, usuario) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!usuario) return res.status(400).json({status: 400, mensaje: 'Los datos no son validos.'});
            
            bcrypt.compare(login_info.pass, usuario.pass, (err, result) => {
                if(err) return res.status(500).json({status: 500, message: err})
                if(!result){
                    res.status(400).json({status: 400, message: 'El password no es correcto'});
                }
                else {
                    const payload = {
                        user_id: usuario.id
                    }
        
                    const access_token = jwt.sign(payload, 'lZ5aVu9NDKKLwAFbV67v4ZHl9San1Lwa6Yfq5sgkvVscxB96Z4', {
                        expiresIn: '1d'
                    });
        
                    let update = {
                        user_id: usuario.id,
                        jwt: access_token
                    }; 
                    
                    Sessions.findOneAndUpdate({user_id: usuario.id}, update, {upsert: true, new:true}, (err, sessionsUpdate) => {
                        if(err) return res.status(500).json({message: err});
                        if(!sessionsUpdate) return res.status(404).json({message: "Datos erroneos."});
                        
                        return res.status(200).json({
                            status: 200,
                            message: "Autenticación correcta.",
                            token: access_token
                        });
                    });
                }
            });
        });
    },

    logout: function(req, res){
        Sessions.findOneAndRemove({user_id: req.decoded.user_id}, (err, sessionDelete) => {
            if(err) return res.status(500).json({message: err});
            if(!sessionDelete) return res.status(404).json({message: 'Datos erroneos.'});

            return res.status(200).json({
                message: "Usuario salió correctamente."
            });
        });
    }
};

module.exports = controller;
