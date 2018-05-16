"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const route = express_1.Router();
route.get('/', (req, res) => {
    db_1.Subject.findAll({
        attributes: ["id", "name"]
    }).then((list) => res.json(list))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id', (req, res) => {
    db_1.Subject.findOne({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((subject) => res.json(subject))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/', (req, res) => {
    db_1.Subject.create({
        name: req.body.name
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
route.put('/:id', (req, res) => {
    db_1.Subject.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then((row) => res.json(row))
        .catch((err) => res.json({ error: err.message }));
});
route.delete('/:id', (req, res) => {
    db_1.Subject.destroy({
        where: {
            id: req.params.id
        }
    }).then((row) => res.json(row))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id/teachers', (req, res) => {
    db_1.Teacher.findAll({
        attributes: ["id", "name"],
        where: {
            subjectId: req.params.id
        }
    }).then((list) => res.json(list))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/:id/teachers', (req, res) => {
    db_1.Teacher.create({
        name: req.body.name,
        subjectId: req.params.id
    })
        .then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
exports.default = route;
