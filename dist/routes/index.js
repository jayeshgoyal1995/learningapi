"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const batches_1 = __importDefault(require("./batches"));
const courses_1 = __importDefault(require("./courses"));
const students_1 = __importDefault(require("./students"));
const subjects_1 = __importDefault(require("./subjects"));
const teachers_1 = __importDefault(require("./teachers"));
const route = express_1.Router();
route.use('/batches', batches_1.default);
route.use('/courses', courses_1.default);
route.use('/students', students_1.default);
route.use('/subjects', subjects_1.default);
route.use('/teachers', teachers_1.default);
exports.default = route;
