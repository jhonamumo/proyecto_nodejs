'use strict'
var controller = {
    welcome: function(req, res){
        console.log("Get ejecutado en raiz");
        res.send("Mi primer debug");
    }/*,

    alumnos: function(req, res){
        res.send("Mi listado de alumnos");
    },

    alumno: function(req, res){
        let cal1 = 10;
        let cal2 = 8;
        let cal3 = 9;

        let final = (cal1 + cal2 + cal3) / 3;

        console.log(final);

        //res.send("La calificación final es: "+final);
        if(final < 6){
            return res.status(400).json({
                status: 400,
                cal_final: final
            });
        }
        else {
            return res.status(200).json({
                status: 200,
                cal_final: final
            });
        }
    },

    crear_alumno: function(req, res){

        let user_info = req.body;
        console.log(user_info);

        //res.send("Creamos un alumno Nombre: "+user_info.nombre+" Apellido: "+user_info.apellido);
        return res.status(200).json({
            status: 200,
            nombre_de_alumno: user_info.nombre,
            apellido_de_alumno: user_info.apellido
        })
    },

    actualizar_alumno: (req, res) => {
        res.send("Actualizamos un alumno");
    },

    eliminar_alumno: (req, res) => {
        res.send("Eliminamos un alumno");
    }*/
}

module.exports = controller;
