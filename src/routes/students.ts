import { Router } from 'express';
import { Student, Batch, StudentBatch } from '../db'

const route: Router = Router();

route.get('/', (req: any, res: any) => {
    Student.findAll({
        attributes: ["id", "name"]
    }).then((list) => res.json({ studentList: list }))
        .catch((err) => res.json({ error: err.message }))

});

route.get('/:id', (req: any, res: any) => {
    Student.findAll({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((student) => res.json({ student: student }))
        .catch((err) => res.json({ error: err.message }))

});

route.post('/', (req: any, res: any) => {
    Student.create({
        name: req.body.name
    }).then((obj) => res.json(obj))
        .catch((err) => res.json({ error: err.message }))
})

route.put('/:id', (req: any, res: any)=>{
    Student.update({
        name: req.body.name
    },{
        where: {
            id: req.params.id
        }
    }).then((row)=> res.json({row: row}))
    .catch((err)=> res.json({error: err.message}))
});

route.delete('/:id', (req: any, res: any)=>{
    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then((row)=> res.json({row: row}))
    .catch((err)=> res.json({error: err.message}))
})


// route.post('/:id/batches', (req, res)=>{
// Student.create({
//     id: req.params.id,
//     name: req.body.name,
//     batches: [{id: req.body.batch}]
// }, {include: [Batch]
// }).then((obj)=> res.json(obj))
// .catch((err)=> res.json({error: err.message}))

// })

// route.get('/:id/batches', (req: any, res: any)=>{
//     Student.find({
//         where: { 
//             id: req.params.id 
//         },
//         include: [{ all: true}]
//       }).then((list)=> res.json({batchList: list}))
//       .catch((err)=> res.json({error: err.message}))
// })

route.get('/:id/batches', (req, res)  =>  {
    StudentBatch.findAll({
        where: {
            studentId: req.params.id
        }
    })
    .then((studentBatch:  any[])  =>  {
        let  batchIdArray:  number[]  =  [];
        for  (let  obj  of  studentBatch) {
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
    StudentBatch.create({
        batchId: req.body.batchId,
        studentId: req.params.id
    })
    .then((obj) => res.json(obj))
    .catch((err) => res.json({error: err.message}))
})

export default route;