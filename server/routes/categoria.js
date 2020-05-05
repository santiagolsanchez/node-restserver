const express = require('express');
const _ = require('underscore');

let { verificaToken, verificaADM } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Categoria.count({}, (err, conteo) => {
                return res.json({
                    ok: true,
                    categoria,
                    cuantos: conteo
                });
            });
        });
});

app.post('/categoria', [verificaToken, verificaADM], (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no se encontro'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.put('/categoria/:id', [verificaToken, verificaADM], (req, res) => {
    let id = req.params.id;

    let descCategoria = {
        descripcion: req.body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

app.delete('/categoria/:id', [verificaToken, verificaADM], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrado'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDelete
        });
    });
});


module.exports = app;