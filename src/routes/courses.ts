import {Router} from 'express';
import {Batch, Course, Lecture, Student, StudentBatch, Teacher, TeacherBatch} from '../db'

const route: Router = Router();

route.get('/', (req: any, res: any)=>{
    Course.findAll({
        attributes: ["id", "name"]
    }).then((list)=> res.json(list))
    .catch((err)=> res.json({error: err.message}))
    
});

route.get('/:id', (req: any, res: any)=>{
    Course.findOne({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((course)=> res.json(course))
    .catch((err)=> res.json({error: err.message}))
    
});

route.post('/', (req: any, res: any)=>{
    Course.create({
        name: req.body.name
    }).then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})

route.get('/:id/batches', (req: any, res: any)=>{
    Batch.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: Course
        }],
        where: {
            courseId: req.params.id
        }
    }).then((list)=> res.json(list))
    .catch((err)=> res.json({error: err.message}))
})

route.post('/:id/batches', (req: any, res: any)=>{
    Batch.create({
        name: req.body.name,
        courseId: req.params.id
    }).then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})

route.get('/:cid/batches/:bid', (req: any, res: any)=>{
    Batch.findOne({
        attributes: ['id', 'name'],
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})

route.delete('/:cid/batches/:bid', (req: any, res: any)=>{
    Batch.destroy({
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then((rows)=> res.json(rows))
    .catch((err)=> res.json({error: err.message}))
})

route.get('/:cid/batches/:bid/lectures', (req: any, res: any)=>{
    Lecture.findAll({
        attributes: ['id', 'name'],
        where: {
            batchId: req.params.bid,
        }
    }).then((list)=> res.json(list))
    .catch((err)=> res.json({error: err.message}))
})

route.post('/:cid/batches/:bid/lectures', (req: any, res: any)=>{
    Lecture.create({
        name: req.body.name,
        batchId: req.params.bid
    }).then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})

route.get('/:cid/batches/:bid/students', (req: any, res: any)=>{
    StudentBatch.findAll({
        where: {
            batchId: req.params.bid
        }
    })
    .then((studentBatch:  any[])  =>  {
        let  batchIdArray:  number[]  =  [];
        for  (let  obj  of  studentBatch) {
            batchIdArray.push(obj.batchId);
        }
        Student.findAll({
            attributes: ['id',  'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
        .then((list) => res.json(list))
        .catch((err)=> res.json({error: err.message}))
    })
})

route.get('/:cid/batches/:bid/teachers', (req: any, res: any)=>{
    TeacherBatch.findAll({
        where: {
            batchId: req.params.bid
        }
    })
    .then((teacherBatch:  any[])  =>  {
        let  batchIdArray:  number[]  =  [];
        for  (let  obj  of  teacherBatch) {
            batchIdArray.push(obj.batchId);
        }
        Teacher.findAll({
            attributes: ['id',  'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
        .then((list) => res.json(list))
        .catch((err)=> res.json({error: err.message}))
    })
})

export default route;