"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const route = express_1.Router();
route.get('/', (req, res) => {
    db_1.Course.findAll({
        attributes: ["id", "name"]
    }).then((list) => res.json({ courseList: list }))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id', (req, res) => {
    db_1.Course.findAll({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((course) => res.json({ course: course }))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/', (req, res) => {
    db_1.Course.create({
        name: req.body.name
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:id/batches', (req, res) => {
    db_1.Batch.findAll({
        attributes: ['id', 'name'],
        include: [{
                model: db_1.Course
            }],
        where: {
            courseId: req.params.id
        }
    }).then((list) => res.json({ batchList: list }))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/:id/batches', (req, res) => {
    db_1.Batch.create({
        name: req.body.name,
        courseId: req.params.id
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:cid/batches/:bid', (req, res) => {
    db_1.Batch.findOne({
        attributes: ['id', 'name'],
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then((list) => res.json({ batchList: list }))
        .catch((err) => res.json({ error: err.message }));
});
route.delete('/:cid/batches/:bid', (req, res) => {
    db_1.Batch.destroy({
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then((list) => res.json({ batchList: list }))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:cid/batches/:bid/lectures', (req, res) => {
    db_1.Lecture.findAll({
        attributes: ['id', 'name'],
        where: {
            batchId: req.params.bid,
        }
    }).then((list) => res.json({ lectureList: list }))
        .catch((err) => res.json({ error: err.message }));
});
route.post('/:cid/batches/:bid/lectures', (req, res) => {
    db_1.Lecture.create({
        name: req.body.name,
        batchId: req.params.id
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }));
});
route.get('/:cid/batches/:bid/students', (req, res) => {
    db_1.StudentBatch.findAll({
        where: {
            batchId: req.params.id
        }
    })
        .then((studentBatch) => {
        let batchIdArray = [];
        for (let obj of studentBatch) {
            batchIdArray.push(obj.batchId);
        }
        db_1.Student.findAll({
            attributes: ['id', 'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
            .then((list) => res.json({ batchList: list }))
            .catch((err) => res.json({ error: err.message }));
    });
});
route.get('/:cid/batches/:bid/teachers', (req, res) => {
    db_1.TeacherBatch.findAll({
        where: {
            batchId: req.params.id
        }
    })
        .then((teacherBatch) => {
        let batchIdArray = [];
        for (let obj of teacherBatch) {
            batchIdArray.push(obj.batchId);
        }
        db_1.Teacher.findAll({
            attributes: ['id', 'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
            .then((list) => res.json({ batchList: list }))
            .catch((err) => res.json({ error: err.message }));
    });
});
exports.default = route;
