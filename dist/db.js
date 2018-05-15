"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
const db = new sequelize_1.default('learningdb', 'jayesh', 'jayeshgoyal', {
    dialect: "sqlite",
    storage: "./learning.db"
    // dialect: 'mysql',
    // host: 'localhost',
    // pool: {
    //     max: 5,
    //     min: 1,
    //     idle: 1000
    // },
});
exports.Batch = db.define('batch', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Course = db.define('course', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Lecture = db.define('lecture', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Student = db.define('student', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Subject = db.define('subject', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Teacher = db.define('teacher', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.StudentBatch = db.define('StudentBatch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.TeacherBatch = db.define('TeacherBatch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.Batch.belongsToMany(exports.Student, { through: { model: exports.StudentBatch } });
exports.Student.belongsToMany(exports.Batch, { through: { model: exports.StudentBatch } });
exports.Batch.belongsToMany(exports.Teacher, { through: { model: exports.TeacherBatch } });
exports.Teacher.belongsToMany(exports.Batch, { through: { model: exports.TeacherBatch } });
exports.Batch.belongsTo(exports.Course);
exports.Course.hasMany(exports.Batch);
exports.Teacher.belongsTo(exports.Subject);
exports.Subject.hasMany(exports.Teacher);
exports.Lecture.belongsTo(exports.Batch);
exports.Batch.hasMany(exports.Lecture);
db.sync();
