const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const app = express();
const Usuario = require('../models/usuario');


app.get('/usuario', function(req, res) {
    res.json('get Usuario Local!!!')
});

app.post('/usuario', function(req, res) {
    let persona = _pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let usuario = new Usuario({
        nombre: persona.nombre,
        email: persona.email,
        password: bcrypt.hashSync(persona.password, 10),
        role: persona.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.delete('/usuario', function(req, res) {
    res.json({
        id
    })
});

module.exports = app;