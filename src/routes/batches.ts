import {Router} from 'express';
import {Batch, Course} from '../db'
const route: Router = Router();

route.get('/', (req, res) => {
    Batch.findAll({
        attributes: ["id", "name"],
        include: [{
            model: Course,
            attributes: ["id", "name"]
        }]
    }).then((list) => res.json(list))
        .catch((err) => res.json({ error: err.message }));
});

export default route;