'use strict'
const app = require('./app');
const port = 3700;

// mongo connection
const conDb = require('./connection/connectionDb');

conDb.connection.once('open', () => {
    app.listen(port, () => {
        console.log("Servidor de ejemplo ejecutando en http://localhost:"+port);
    });
});
