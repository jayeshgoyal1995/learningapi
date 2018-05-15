"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const route = express_1.Router();
route.get('/', (req, res) => {
    db_1.Teacher.findAll({
        attributes: ["id", "name"]
    }).then((list) => res.json({ teacherList: list }))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/', (req, res) => {
    db_1.Teacher.create({
        name: req.body.name
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id', (req, res) => {
    db_1.Teacher.findOne({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((teacher) => res.json({ teacher: teacher }))
        .catch((err) => res.json({ error: err.message }));
});
route.put('/:id', (req, res) => {
    db_1.Teacher.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then((row) => res.json({ row: row }))
        .catch((err) => res.json({ error: err.message }));
});
route.delete('/:id', (req, res) => {
    db_1.Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then((row) => res.json({ row: row }))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id/batches', (req, res) => {
    db_1.TeacherBatch.findAll({
        where: {
            teacherId: req.params.id
        }
    })
        .then((teacherBatch) => {
        let batchIdArray = [];
        for (let obj of teacherBatch) {
            batchIdArray.push(obj.batchId);
        }
        db_1.Batch.findAll({
            attributes: ['id', 'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
            .then((list) => res.json({ batchList: list }))
            .catch((err) => res.json({ error: err.message }));
    });
});
route.post('/:id/batches', (req, res) => {
    db_1.TeacherBatch.create({
        batchId: req.body.batchId,
        teacherId: req.params.id
    })
        .then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
exports.default = route;
