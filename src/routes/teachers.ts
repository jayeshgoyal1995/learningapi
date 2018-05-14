import {Router} from 'express';
import {Batch, Teacher, TeacherBatch} from '../db'
const route: Router = Router();

route.get('/', (req: any, res: any)=>{
    Teacher.findAll({
        attributes: ["id", "name"]
    }).then((list)=> res.json({teacherList: list}))
    .catch((err)=> res.json({error: err.message}))
    
});

route.post('/', (req: any, res: any)=>{
    Teacher.create({
        name: req.body.name
    }).then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})

route.get('/:id', (req: any, res: any)=>{
    Teacher.findOne({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((teacher)=> res.json({teacher: teacher}))
    .catch((err)=> res.json({error: err.message}))
    
});

route.put('/:id', (req: any, res: any)=>{
    Teacher.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then((row)=> res.json({row: row}))
    .catch((err)=> res.json({error: err.message}))
});

route.delete('/:id', (req: any, res: any)=>{
    Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then((row)=> res.json({row: row}))
    .catch((err)=> res.json({error: err.message}))
})

route.get('/:id/batches', (req, res)  =>  {
    TeacherBatch.findAll({
        where: {
            teacherId: req.params.id
        }
    })
    .then((teacherBatch:  any[])  =>  {
        let  batchIdArray:  number[]  =  [];
        for  (let  obj  of  teacherBatch) {
            batchIdArray.push(obj.batchId);
        }
        Batch.findAll({
            attributes: ['id',  'name'],
            where: {
                id: { $in: batchIdArray }
            }
        })
        .then((list) => res.json({batchList: list}))
        .catch((err)=> res.json({error: err.message}))
    })
})


route.post('/:id/batches', (req, res) => {
    TeacherBatch.create({
        batchId: req.body.batchId,
        teacherId: req.params.id
    })
    .then((obj) => res.json(obj))
    .catch((err) => res.json({error: err.message}))
})


export default route;