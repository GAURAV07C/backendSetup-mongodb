import {Router} from 'express'
import apiController from '../controllers/apiController';

const router = Router();

router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)


export default router;
