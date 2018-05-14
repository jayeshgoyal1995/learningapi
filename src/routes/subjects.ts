import {Router} from 'express';
import {Subject, Teacher} from '../db'

const route: Router = Router();

route.get('/', (req: any, res: any)=>{
    Subject.findAll({
        attributes: ["id", "name"]
    }).then((list)=> res.json({subjectList: list}))
    .catch((err)=> res.json({error: err.message}))
    
});

route.get('/:id', (req: any, res: any)=>{
    Subject.findAll({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        }
    }).then((subject)=> res.json({subject: subject}))
    .catch((err)=> res.json({error: err.message}))
    
});

route.post('/', (req: any, res: any)=>{
    Subject.create({
        name: req.body.name
    }).then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})

route.put('/:id', (req: any, res: any)=>{
    Subject.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then((row)=> res.json({row: row}))
    .catch((err)=> res.json({error: err.message}))
});

route.delete('/:id', (req: any, res: any)=>{
    Subject.destroy({
        where: {
            id: req.params.id
        }
    }).then((row)=> res.json({row: row}))
    .catch((err)=> res.json({error: err.message}))
})


route.get('/:id/teachers', (req: any, res: any)=>{
    Teacher.findAll({
        attributes: ["id", "name"],
        where: {
            subjectId: req.params.id
        }
    }).then((list)=> res.json({teacherList: list}))
    .catch((err)=> res.json({error: err.message}))
})

route.post('/:id/teachers', (req: any, res: any)=>{
    Teacher.create({
        name: req.body.name,
        subjectId: req.params.id
    })
    .then((obj)=> res.json(obj))
    .catch((err)=> res.json({error: err.message}))
})


export default route;