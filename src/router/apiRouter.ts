import {Router} from 'express'
import apiController from '../controllers/apiController';

const router = Router();

router.route('/self').get(apiController.self)


export default router;
