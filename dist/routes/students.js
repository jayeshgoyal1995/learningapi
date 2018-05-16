"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const route = express_1.Router();
route.get('/', (req, res) => {
    db_1.Student.findAll({
        attributes: ["id", "name"]
    }).then((list) => res.json(list))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id', (req, res) => {
    db_1.Student.findOne({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((student) => res.json(student))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/', (req, res) => {
    db_1.Student.create({
        name: req.body.name
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
route.put('/:id', (req, res) => {
    db_1.Student.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then((rows) => res.json(rows))
        .catch((err) => res.json({ error: err.message }));
});
route.delete('/:id', (req, res) => {
    db_1.Student.destroy({
        where: {
            id: req.params.id
        }
    }).then((rows) => res.json(rows))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id/batches', (req, res) => {
    db_1.StudentBatch.findAll({
        where: {
            studentId: req.params.id
        }
    })
        .then((studentBatch) => {
        let batchIdArray = [];
        for (let obj of studentBatch) {
            batchIdArray.push(obj.batchId);
        }
        db_1.Batch.findAll({
            attributes: ['id', 'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
            .then((list) => res.json(list))
            .catch((err) => res.json({ error: err.message }));
    });
});
route.post('/:id/batches', (req, res) => {
    db_1.StudentBatch.create({
        batchId: req.body.batchId,
        studentId: req.params.id
    })
        .then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
exports.default = route;
