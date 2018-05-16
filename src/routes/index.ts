import {Router} from 'express';
import batches from './batches'
import courses from './courses'
import students from './students'
import subjects from './subjects'
import teachers from './teachers'
const route: Router = Router();

route.use('/batches', batches);
route.use('/courses', courses);
route.use('/students', students);
route.use('/subjects', subjects);
route.use('/teachers', teachers);

export default route;