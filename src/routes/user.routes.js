import { Router} from 'express';
const router = Router()

import * as userController from '../controllers/userscontroller'
import {authJwt} from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isAdmin] ,userController.createUser);


export default Router;