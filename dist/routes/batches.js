"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const route = express_1.Router();
route.get('/', (req, res) => {
    db_1.Batch.findAll({
        attributes: ["id", "name"],
        include: [{
                model: db_1.Course,
                attributes: ["id", "name"]
            }]
    }).then((list) => res.json(list))
        .catch((err) => res.json({ error: err.message }));
});
exports.default = route;
