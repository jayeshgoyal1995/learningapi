import {Router} from 'express';
import courses from './courses'
import students from './students'
import subjects from './subjects'
import teachers from './teachers'
const route: Router = Router();

route.use('/courses', courses);
route.use('/students', students);
route.use('/subjects', subjects);
route.use('/teachers', teachers);

export default route;