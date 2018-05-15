import Sequelize from 'sequelize'
import { BatchClass } from './classes/batch'
import { CourseClass } from './classes/course'
import { LectureClass } from './classes/lecture'
import { StudentClass } from './classes/student'
import { SubjectClass } from './classes/subject'
import { TeacherClass } from './classes/teacher'

const Op = Sequelize.Op;

const db = new Sequelize('learningdb', 'jayesh', 'jayeshgoyal', {
    dialect: "sqlite",
    storage: "./learning.db"
    // dialect: 'mysql',
    // host: 'localhost',
    // pool: {
    //     max: 5,
    //     min: 1,
    //     idle: 1000
    // },
})

export const Batch = db.define<BatchClass, any>('batch', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const Course = db.define<CourseClass, any>('course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const Lecture = db.define<LectureClass, any>('lecture', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const Student = db.define<StudentClass, any>('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const Subject = db.define<SubjectClass, any>('subject', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const Teacher = db.define<TeacherClass, any>('teacher', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


export const StudentBatch = db.define('StudentBatch', {
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
    }
})

export const TeacherBatch = db.define('TeacherBatch', {
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
    }
})


Batch.belongsToMany(Student,{through:{model:StudentBatch}})
Student.belongsToMany(Batch,{through:{model:StudentBatch}}) 

Batch.belongsToMany(Teacher,{through:{model:TeacherBatch}})
Teacher.belongsToMany(Batch,{through:{model:TeacherBatch}}) 

Batch.belongsTo(Course);
Course.hasMany(Batch);

Teacher.belongsTo(Subject);
Subject.hasMany(Teacher);

Lecture.belongsTo(Batch)
Batch.hasMany(Lecture)

db.sync();

